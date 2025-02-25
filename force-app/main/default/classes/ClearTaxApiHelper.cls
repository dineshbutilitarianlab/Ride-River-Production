/**
* @author Dinesh Baddawar
* @email dinesh.butilitarianlab@gmail.com
* @create date 2025-01-08 11:39:15
* @modify date 2025-01-08 11:39:15
* @desc [ClearTax All API Method whihc using for the API]
*/

public with sharing class ClearTaxApiHelper {
    
    private static ClearTax_Api_Details__c clearTaxDetails;
    static {
        clearTaxDetails = ClearTax_Api_Details__c.getInstance('ClearTax Api');
        if (clearTaxDetails == null) {
            System.debug('Custom setting "ClearTax Api" is not found.');
        }
    }
    
    // Method to get Access Token
    public static String getAccessToken() {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(clearTaxDetails.BaseURL_AccessToken__c);
        request.setMethod('GET');
        request.setHeader('x-clear-client-secret', clearTaxDetails.Client_Secret__c);
        try {
            HttpResponse response = http.send(request);
            // ExceptionHelper.createAPICalloutLog(request,response,'');
            if (response.getStatusCode() == 200) {
                System.debug('Response #1 == > ' + response.getBody());
                Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
                if (responseMap.containsKey('access_token')) {
                    String accessToken = (String) responseMap.get('access_token');
                    System.debug('Access Token == > ' + accessToken);
                    return accessToken;
                } else {
                    System.debug('access_token not found in the response');
                    return null;
                }
            } else {
                System.debug('Error: ' + response.getStatusCode() + ' - ' + response.getBody());
                return null;
            }
        } catch (Exception e) {
            ExceptionHelper.createExceptionLog(e);
            System.debug('Exception Message # == > ' + e.getMessage()+' && Line  === >'+e.getLineNumber());
            return null;
        }
    }
    
    // =============================================================================================================================================================================================================
    // Method to Generate IRN & SignedQRCode  ##1
    @AuraEnabled
    public static String generateEInvoice(String recordId) {
        String returnResponse;
        String attachmentId;
        Order orderRecord = [ SELECT Id, Name, AccountId, Dealer__c,Dealer__r.Company_GSTIN_name__c, TotalAmount,Is_IGST_on_Intrastate__c,OrderNumber  FROM Order WHERE Id = :recordId ];
        try{
            Http http = new Http();
            HttpRequest request = new HttpRequest();
            request.setEndpoint(clearTaxDetails.E_Invoice_Base_URL__c);
            request.setMethod('PUT');
            request.setHeader('Content-Type', 'application/json');
            request.setHeader('X-Cleartax-Auth-Token', getAccessToken());
            request.setHeader('gstin', orderRecord.Dealer__r.Company_GSTIN_name__c); // Seller GSTIN
            String payload = generatePayloadForIRN(recordId);
            System.debug('payload === >'+payload);
            request.setBody(payload);
            HttpResponse response = http.send(request);
            ExceptionHelper.createAPICalloutLog(request,response,recordId);
            if (response.getStatusCode() == 200) {
                System.debug('Response #2 == > ' + response.getBody());
                List<Object> responseList = (List<Object>) JSON.deserializeUntyped(response.getBody());
                if (!responseList.isEmpty()) {
                    Map<String, Object> firstItem = (Map<String, Object>) responseList[0];
                    if (firstItem.containsKey('govt_response')) {
                        Map<String, Object> govtResponse = (Map<String, Object>) firstItem.get('govt_response');
                        if (govtResponse.containsKey('Irn')) {
                            String IrnNumber = (String) govtResponse.get('Irn');
                            System.debug('IrnNumber == > ' + IrnNumber);
                            ClearTaxTagIrnNumber.TagIRNnumberToOrder(orderRecord.Id,IrnNumber);
                        }
                        if (govtResponse.containsKey('SignedQRCode')) {
                            String signedQRCode = (String) govtResponse.get('SignedQRCode');
                            System.debug('SignedQRCode == > ' + signedQRCode);
                            // attachmentId =  
                            ClearTaxTagIrnNumber.generateAndStoreQRCode(signedQRCode,recordId);
                            return returnResponse = 'SUCCESS';
                        } else {
                            System.debug('SignedQRCode not found in govt_response.');
                            return returnResponse = 'SignedQRCode not found in govt_response.';
                        }
                    } else {
                        System.debug('govt_response not found in the first item.');
                        return returnResponse = 'govt_response not found in the first item.';
                    }
                } else {
                    System.debug('Response list is empty.');
                    return returnResponse = 'Response list is empty.';
                }
            } else {
                System.debug('Error = > ' + response.getStatusCode() + ' ' + response.getBody());
            }
        }catch(Exception e){
            ExceptionHelper.createExceptionLog(e);
            System.debug('Error Message ==>'+e.getMessage()+' && Error Line == >'+e.getLineNumber());
            return returnResponse = 'Error :'+e.getMessage();
        }
        return null;
    }
    
    // Method to Generate Payload for Order Record ##2
    @AuraEnabled
    public static String generatePayloadForIRN(Id orderId) {
        List<Map<String, Object>> payloadList = new List<Map<String, Object>>();
        try {
            System.debug('orderId == >' + orderId);
            Order orderRecord = [ SELECT Id, Name, AccountId, Dealer__c, TotalAmount, Is_IGST_on_Intrastate__c, OrderNumber  FROM Order WHERE Id = :orderId ];
            System.debug('orderRecord == >' + orderRecord);
            if (orderRecord != null) {
                // Fetch Buyer Details
                Account buyer = [ SELECT Id, Name, BillingStreet, BillingCity, BillingPostalCode, BillingState,  Company_GSTIN_name__c, Phone, Email__c   FROM Account WHERE Id = :orderRecord.AccountId];
                System.debug('buyer == >' + buyer);
                // Fetch Seller Details
                Account seller = [ SELECT Id, Name, BillingStreet, BillingCity, BillingPostalCode, BillingState,  Company_GSTIN_name__c, Phone, Email__c,Center_Code__c  FROM Account WHERE Id = :orderRecord.Dealer__c];
                System.debug('seller == >' + seller);
                // Fetch Order Items
                List<OrderItem> orderItems = [ SELECT Product2.Name, Quantity, Product2.HSN_Code__c, UnitPrice  FROM OrderItem WHERE OrderId = :orderId];
                System.debug('orderItems == >' + orderItems);
                
                // Create Transaction Map
                Map<String, Object> transactionMap = new Map<String, Object>();
                transactionMap.put('Version', '1.1');
                
                // Transaction Details
                transactionMap.put('TranDtls', new Map<String, Object>{
                    'TaxSch' => 'GST',
                        'SupTyp' => 'B2B',
                        'RegRev' => 'N',
                        'EcmGstin' => null,
                        'IgstOnIntra' => orderRecord.Is_IGST_on_Intrastate__c ? 'Y' : 'N'
                            });
                
                // Document Details
                String formattedDateTime =  System.now().format('dd') +  System.now().format('MM') +   System.now().format('HH') +  System.now().format('mm');
                System.debug('Formatted DateTime === > ' + formattedDateTime);
                Date today = System.today();
                String formattedDate = 
                    (today.day() < 10 ? '0' + String.valueOf(today.day()) : String.valueOf(today.day())) + '/' +
                    (today.month() < 10 ? '0' + String.valueOf(today.month()) : String.valueOf(today.month())) + '/' + today.year();
                System.debug('Formatted Date === > ' + formattedDate);
                transactionMap.put('DocDtls', new Map<String, Object>{
                    'Typ' => 'INV',
                        'No' => 'INR' + orderRecord.OrderNumber.substring(Math.max(0, orderRecord.OrderNumber.length() - 4)) + formattedDateTime,
                        'Dt' => formattedDate
                        });
                
                // Seller Details
                transactionMap.put('SellerDtls', new Map<String, Object>{
                    'Gstin' => seller.Company_GSTIN_name__c,
                        'LglNm' => seller.Name,
                        'TrdNm' => seller.Name,
                        'Addr1' => seller.BillingStreet,
                        'Addr2' => '',
                        'Loc' => seller.BillingCity,
                        'Pin' => Integer.valueOf(seller.BillingPostalCode),
                        'Stcd' => seller.Center_Code__c.substring(0,2), // '29', // Should be dynamically determined
                        'Ph' => seller.Phone,
                        'Em' => seller.Email__c
                        });
                
                // Buyer Details
                transactionMap.put('BuyerDtls', new Map<String, Object>{
                    'Gstin' => buyer.Company_GSTIN_name__c,
                        'LglNm' => buyer.Name,
                        'TrdNm' => buyer.Name,
                        'Pos' => '12', // Should be dynamically determined ##
                        'Addr1' => buyer.BillingStreet,
                        'Addr2' => '',
                        'Loc' => buyer.BillingCity,
                        'Pin' => Integer.valueOf(buyer.BillingPostalCode),
                        'Stcd' => '29', // Should be dynamically determined ## 
                        'Ph' => buyer.Phone,
                        'Em' => buyer.Email__c
                        });
                
                // Item List and Totals Calculation
                List<Map<String, Object>> itemList = new List<Map<String, Object>>();
                Integer slNo = 1;
                Decimal totalIgstAmt = 0;
                Decimal totalCesAmt = 0;
                Decimal totalStateCesAmt = 0;
                Decimal sumTotItemVal = 0;
                Decimal totalAmountOrderItem = 0;
                
                for (OrderItem item : orderItems) {
                    System.debug('Processing item == >'+item);
                    
                    Decimal totAmt = item.Quantity * item.UnitPrice;
                    totalAmountOrderItem += totAmt;
                    
                    Decimal discount = 0; 
                    Decimal preTaxVal = 1;
                    Decimal gstRate = 12.0;
                    Decimal igstAmt = totAmt * (gstRate / 100);
                    Decimal cesAmt = totAmt * (5 / 100);
                    Decimal stateCesAmt = totAmt * (12 / 100);
                    
                    totalIgstAmt += igstAmt;
                    totalCesAmt += cesAmt;
                    totalStateCesAmt += stateCesAmt;
                    
                    Decimal totItemVal = totAmt + igstAmt + 0 + 0 + 0; // Ensure all components are included
                    sumTotItemVal += totItemVal;
                    
                    itemList.add(new Map<String, Object>{
                        'SlNo' => String.valueOf(slNo),
                            'PrdDesc' => item.Product2.Name,
                            'IsServc' => 'N',
                            'HsnCd' => item.Product2.HSN_Code__c,
                            'Barcde' => '123456',
                            'Qty' => item.Quantity,
                            'FreeQty' => 0,
                            'Unit' => 'BAG',
                            'UnitPrice' => item.UnitPrice,
                            'TotAmt' => totAmt,
                            'Discount' => discount,
                            'PreTaxVal' => preTaxVal,
                            'AssAmt' => totAmt,
                            'GstRt' => gstRate,
                            'IgstAmt' => igstAmt,
                            'CgstAmt' => 0,
                            'SgstAmt' => 0,
                            'CesRt' => 0,
                            'CesAmt' => 0,
                            'CesNonAdvlAmt' => 0,
                            'StateCesRt' => 0,
                            'StateCesAmt' => 0,
                            'StateCesNonAdvlAmt' => 0,
                            'OthChrg' => 0,
                            'TotItemVal' => totItemVal,
                            'OrdLineRef' => '3256',
                            'OrgCntry' => 'AG',
                            'PrdSlNo' => '12345'
                            });
                    slNo++;
                }
                
                // Corrected Total Invoice Value Calculation
                Decimal totalInvoiceValue = sumTotItemVal - 0 + 0 + 0.3;
                
                transactionMap.put('ItemList', itemList);
                
                transactionMap.put('ValDtls', new Map<String, Object>{
                    'AssVal' => totalAmountOrderItem,
                        'CgstVal' => 0,
                        'SgstVal' => 0,
                        'IgstVal' => totalIgstAmt,
                        'CesVal' => totalCesAmt,
                        'StCesVal' => totalStateCesAmt,
                        'Discount' => 0,
                        'OthChrg' => 0,
                        'RndOffAmt' => 0.3,
                        'TotInvVal' => totalInvoiceValue, 
                        'TotInvValFc' => totalInvoiceValue
                        });
                Map<String, Object> wrapperMap = new Map<String, Object>();
                wrapperMap.put('transaction', transactionMap);
                payloadList.add(wrapperMap);
                return JSON.serialize(payloadList);
            }
        } catch (Exception e) {
            ExceptionHelper.createExceptionLog(e);
            System.debug('Error Message ==>' + e.getMessage() + ' && Error Line == >' + e.getLineNumber());
        }
        return null;
    }
    
    // Method to Generate E-invoice PDF - IRN #5
    @AuraEnabled 
    Public static string genereteE_invoicePDF(String recordId){
        String response;
        try{
            if(recordId != null){
                Order ord = [SELECT Id,OrderNumber,Is_QR_Generated__c FROM Order WHERE Id=:recordId LIMIT 1];
                PageReference vfPagepdf = page.CreateReceiptVehicle;
                vfPagepdf.getParameters().put('id',recordId);
                Blob pdfBlob;
                if(Test.isRunningTest()){
                    pdfBlob = Blob.valueOf('Test');
                }else{
                    pdfBlob = vfPagepdf.getContentAsPDF();
                } 
                Attachment attachment = new Attachment();
                attachment.ParentId = recordId;
                attachment.Name = 'E-invoice-'+ord.OrderNumber+'-'+Date.Today().Format()+'.pdf';
                attachment.Body = pdfBlob;
                attachment.ContentType = 'application/pdf';
                insert attachment;
                System.debug('E-invoice PDF === >'+attachment);
                if(attachment != null){
                    ord.Is_E_invoice_Generated__c = true;
                    update ord;
                    System.debug('E-invoice PDF Generated Ordder === >'+ord);
                    ClearTaxTagIrnNumber.deleteOrderQRcode(ord);
                    response = 'success';
                }
            }
        }catch(Exception e){
            ExceptionHelper.createExceptionLog(e);
            System.debug('Error Message ==>'+e.getMessage()+' && Error Line == >'+e.getLineNumber());
            response = e.getMessage();
        }
        System.debug('response == >'+response);
        return response;
    }
    
    // =============================================================================================================================================================================================================
    
    // Method to Cancel IRN (before 24 hours)
    @AuraEnabled
    public static String cancelIRN_EInvoice(String cancellationReason, String cancellationRemark,String orderId) {
        System.debug(' && cancellationReason == >'+cancellationReason+' && cancellationRemark == >'+cancellationRemark+' && orderId == >'+orderId);
        Order ordRec = new Order();
        if(orderId != null){
            ordRec = [SELECT Id,OrderNumber,Dealer__r.Company_GSTIN_name__c,IRN_No__c FROM Order WHERE Id =:orderId LIMIT 1];
            System.debug('ordRec == >'+ordRec);
        }else{
            return 'Attention: Order ID is required.';
        }
        try{
            if (String.isBlank(ordRec.IRN_No__c) || ordRec.IRN_No__c  == null) {
                return 'Attention : IRN is required.';
            }
            
            if (String.isBlank(cancellationReason) || cancellationReason == null) {
                return 'Attention: Cancellation reason is required.';
            }
            if (String.isBlank(ordRec.Dealer__r.Company_GSTIN_name__c) || ordRec.Dealer__r.Company_GSTIN_name__c == null) {
                return 'Attention: Seller GSTIN is required.';
            }
            
            Map<String, String> result = new Map<String, String>();
            List<CancelRequest> requestBody = new List<CancelRequest>();
            CancelRequest cancelReq = new CancelRequest();
            cancelReq.irn = ordRec.IRN_No__c;
            cancelReq.CnlRsn = cancellationReason;
            cancelReq.CnlRem = cancellationRemark != null ? cancellationRemark : '';
            requestBody.add(cancelReq);
            String jsonBody = JSON.serialize(requestBody);
            
            HttpRequest req = new HttpRequest();
            req.setEndpoint(clearTaxDetails.Cancel_IRN_Base_URL__c);
            req.setMethod('PUT');
            req.setHeader('Content-Type', 'application/json');
            req.setHeader('X-Cleartax-Auth-Token', getAccessToken());
            req.setHeader('gstin', ordRec.Dealer__r.Company_GSTIN_name__c);
            req.setBody(jsonBody);
            req.setTimeout(120000);
            Http http = new Http();
            HttpResponse res = http.send(req);
            if (res.getStatusCode() == 200) {
                Object responseObj = JSON.deserializeUntyped(res.getBody());
                if (responseObj instanceof List<Object>) {
                    List<Object> responseList = (List<Object>) responseObj;
                    if (!responseList.isEmpty() && responseList[0] instanceof Map<String, Object>) {
                        Map<String, Object> firstResponse = (Map<String, Object>) responseList[0];
                        System.debug('firstResponse == > ' + firstResponse);
                        result.put('document_status', (String) firstResponse.get('document_status'));
                        Map<String, Object> govtResponse = (Map<String, Object>) firstResponse.get('govt_response');
                        System.debug('govtResponse == > ' + govtResponse);
                        if (govtResponse != null) {
                            result.put('Success', (String) govtResponse.get('Success'));
                            result.put('AckNo', String.valueOf(govtResponse.get('AckNo')));
                            result.put('AckDt', (String) govtResponse.get('AckDt'));
                            if( (String) govtResponse.get('Success') == 'Y'){
                                ordRec.IRN_No__c = null;
                                ordRec.IRN_Generated_DateTime__c = null;
                                ordRec.Is_IRN_Cancelled__c = true;
                                // update ordRec;
                                return 'success';
                            }
                        }
                        System.debug('Result == > ' + result);
                    }
                }
            }else {
                System.debug('HTTP Error: Status Code = ' + res.getStatusCode() + ', Status = ' + res.getStatus());
            }
        }catch(Exception e){
            ExceptionHelper.createExceptionLog(e);
            System.debug('Error Message ==>'+e.getMessage()+' && Error Line == >'+e.getLineNumber());
        }
        return null;
    }
    
    public class CancelRequest {
        public String irn { get; set; }
        public String CnlRsn { get; set; }
        public String CnlRem { get; set; }
    }
    
    // =============================================================================================================================================================================================================
    
     // Method to Generate E-Waybill using IRN
    @AuraEnabled 
    public static String generateEWayBillUsingIRN(String shipId) {
        Order ordRec = new Order();
        try {
            Shipment shipRec = [SELECT Id,Order__r.OrderNumber, Order__c,Order__r.Dealer__r.Company_GSTIN_name__c,Order__r.IRN_No__c  FROM Shipment WHERE Id = :shipId LIMIT 1];
            System.debug('shipRec == > ' + shipRec);
            String formattedDate = System.today().day() + '/' + ((System.today().month() < 10) ? '0' + String.valueOf(System.today().month()) : String.valueOf(System.today().month())) + '/' + System.today().year();
            System.debug('formattedDate == > ' + formattedDate);
            String requestBody = '[{"Irn": "' + shipRec.Order__r.IRN_No__c + '", "Distance": ' + 0 + ', "TransMode": "' + '1' + '", "TransId": "' + order.Id + '", "TransName": "' + '' + '", "TransDocDt": "' + formattedDate + '", "TransDocNo": "' + 'TRAN/DOC/'+shipRec.Order__r.OrderNumber.right(4)+ + '", "VehNo": "' + '' + '", "VehType": "' + 'R' + '"}]';
            System.debug('Request Body == > ' + requestBody);
            HttpRequest req = new HttpRequest();
            req.setEndpoint(clearTaxDetails.E_Way_Bill_BaseURL__c);
            req.setMethod('POST');
            req.setHeader('Content-Type', 'application/json');
            req.setHeader('X-Cleartax-Auth-Token', getAccessToken());
            req.setHeader('gstin', shipRec.Order__r.Dealer__r.Company_GSTIN_name__c);
            req.setBody(requestBody);
            
            Http http = new Http();
            HTTPResponse res = http.send(req);
            ExceptionHelper.createAPICalloutLog(req,res,shipId);
            System.debug('Response ==> ' + res.getBody());
            if (res.getStatusCode() == 200) {
                String responseBody = res.getBody();
                List<Object> responseList = (List<Object>) JSON.deserializeUntyped(responseBody);
                Map<String, Object> responseMap = (Map<String, Object>) responseList[0];
                if (responseMap.containsKey('govt_response')) {
                    Map<String, Object> govtResponse = (Map<String, Object>) responseMap.get('govt_response');
                    if (govtResponse.containsKey('EwbNo')) {
                        String ewbNo = String.valueOf(govtResponse.get('EwbNo'));
                        System.debug('Extracted EwbNo ==> ' + ewbNo);
                        return 'Success';
                    }
                }
            } else {
                return 'Error: ' + res.getStatus();
            }
        } catch (Exception e) {
            ExceptionHelper.createExceptionLog(e);
            System.debug('Exception = > ' + e.getMessage()+' && Line  === >'+e.getLineNumber());
        }
        return null;
    }
}