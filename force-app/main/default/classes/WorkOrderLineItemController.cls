public with sharing class WorkOrderLineItemController {
   
    @AuraEnabled(cacheable=true)
    public static List<WorkOrderLineItem> getRelatedWorkOrderLineItems(Id workOrderId){
           System.debug('Fetching related Products for Work Order Id: ' + workOrderId);
        List<WorkOrderLineItem> WorkOrderLineItems = [SELECT WorkOrderId, Id, LineItemNumber, PricebookEntryId, PricebookEntry.Product2.Name, Quantity, RR_Parts_Category__c, Status,
                                                        PricebookEntry.Product2.ProductCode,CreatedDate,WorkOrder.WorkOrderNumber, PricebookEntry.Product2Id
                                                      FROM WorkOrderLineItem
                                                      WHERE WorkOrderId=: workOrderId
                                                      ORDER BY CreatedDate ASC];
                        System.debug('Retrieved related WorkOrderLineItems: ' + WorkOrderLineItems);

        RETURN WorkOrderLineItems;

    }

}