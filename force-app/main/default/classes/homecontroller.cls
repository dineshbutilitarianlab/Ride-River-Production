/**
* @File Name : homecontroller.cls
* @Description :
* @Author :
* @Last Modified By :
* @Last Modified On : September 13, 2024
* @Modification Log :
*==============================================================================
* Ver | Date | Author | Modification
*==============================================================================
* 1.0 | September 13, 2024 |   | Initial Version
**/

public  class homecontroller{
    @AuraEnabled
    public static List<Lead> getLeadsList(String searchKeyword){
        String key = '%' + searchKeyword + '%';
        List<Lead> SearchLeads = [Select id,Name, LeadSource, Phone, Customer_Age__c, Lead_Age__c from Lead WHERE (Name LIKE:key OR Phone LIKE:key) and isConverted = false AND Status !='close lost'AND Status!='Test Ride'AND Status !='Follow Up'] ;
        system.debug('hhhh='+SearchLeads);
        return SearchLeads;
    }
    @AuraEnabled
    public static List<Lead> getLeads(){     
        List<Lead> LeadsList = [Select id,Name, Phone,CreatedDate ,testdrives_count__c from Lead where testdrives_count__c=1];
        system.debug('bxcsvvs='+LeadsList);
        
        return LeadsList;
        
    }
     @AuraEnabled
    public static Lead getLeaddeatails(Id leadid){
       
        Lead getLead = [Select id,Name, LeadSource, Phone, Customer_Age__c, Lead_Age__c, city,country,postalCode,state,street,Status from Lead WHERE Id=:leadid  and status != 'Converted' ];
        
        return getLead;
    }
    
   /* @AuraEnabled(cacheable=true)
    public static List<Map<String, String>> getVehicleOptions() {
        List<Map<String, String>> options = new List<Map<String, String>>();
        
        // Query to get Vehicle__c records
        List<Vehicle> vehicles = [SELECT Id, Name FROM Vehicle ORDER BY Name];
        
        // Add each vehicle to the options list
        for (Vehicle vehicle : vehicles) {
            Map<String, String> option = new Map<String, String>();
            option.put('label', vehicle.Name);
            option.put('value', vehicle.Id);
            options.add(option);
        }
        
        return options;
    }
    @auraenabled
    public static void createtestdrive(String testdriveName,DateTime drivedate,Id leadiddd,Id vehicleid,string ridetype){
        Test_Drive__c td=new Test_Drive__c();
        td.Name=testdriveName;
        td.Lead__c=leadiddd;
        td.Test_Drive_Date__c=drivedate;
        //td.Vehicle__c=vehicleid;
        td.Ride_Type__c=ridetype;
        insert td;
        
        
    }
    @auraenabled
    public static void createfollowup(string followupName,id leadiddd){
        Follow_Up__c newfollowup=new Follow_Up__c();
        newfollowup.Name= followupName;
        newfollowup.Lead__c=leadiddd;
        insert newfollowup;
    }*/
    
    @auraenabled
    public static void updatelead(string id, string lead_source, string phone, Decimal Age,string email ,string city,string Country,string PostalCode,string State,string Street, string Status,string psname){
        
        system.debug('gggg='+Country);
        lead ul = new lead();
        ul.Id = id;
        ul.LeadSource = lead_source;
        ul.Phone = phone;
        ul.Customer_Age__c = age;
        ul.City=city;
        ul.Country=Country;
        ul.PostalCode=PostalCode;
        ul.State=State;
        ul.Street=Street;
        ul.Email=email;
        ul.Status=Status;
        ul.PS_Name__c=psname;
        
        update ul;
  
    }
    @auraenabled
    public static void bookingid(id leadid,string bookingid){
        system.debug('id='+leadid);
          system.debug('id='+bookingid);
        list<Lead> upleadlst=new list<Lead>();
        list<Lead> getlead=[select id,BookingId__c from lead where id=:leadid];
        for(lead le:getlead){
            le.BookingId__c=bookingid;
            upleadlst.add(le);
        }
       update upleadlst;
    }
    @auraenabled
    public static Id createnewfollowup(id leadid,datetime followupdate, string feedbackvalue){
            system.debug('enter'+leadid+followupdate+feedbackvalue);
     //  Follow_Up__c followUpObj =[SELECT Id, Name,Lead__c,Status__c FROM Follow_Up__c WHERE Lead__c = :leadid  AND Status__c != 'Completed' ORDER BY CreatedDate DESC LIMIT 1];
               Follow_Up__c crfollowup=new Follow_Up__c();
        if(followupdate!=null&&feedbackvalue!=null){
            system.debug('enter'+leadid+followupdate+feedbackvalue);

        crfollowup.Lead__c=leadid;
        crfollowup.Follow_Up_Date__c=followupdate;
        crfollowup.Feedback__c =feedbackvalue;
            
        }
        insert crfollowup;
        return crfollowup.Id;
    }
    
   /* @AuraEnabled
    public static void getcounts(){
       
        AggregateResult[] numb = [Select COUNT(Id)cc, Lead__c from Test_Drive__c where Lead__c = '00QIp000001K5vVMAS' GROUP BY Lead__c];
        for(AggregateResult n: numb){
            lead l = new Lead();
            l.Id = (Id)n.get('Lead__c');
            Integer i = (integer)n.get('cc');
            system.debug(i);
        }
        
        
        //return numb;
    } */
    @auraenabled
    public static void createstoreride(Id leadid,string testridename,datetime ridedate, boolean Indemnity,string dlnumber ,string storeExcutiveName){
        
        system.debug('hhh'+ridedate);
        String formattedDate = ridedate.format('dd-MMM-yyyy hh:mm:ss a', 'en_IN');
        system.debug(formattedDate);
        if(ridedate!=null){
            Test_Drive__c td=new Test_Drive__c();
            td.Lead__c=leadid;
            td.Name=testridename;
            td.Test_Ride_Date__c=ridedate;
            td.Ride_Type__c='Store Ride'; 
            // td.Indemnity__c= Indemnity;
            td.Drivers_License_Number__c=dlnumber;
            td.Test_ride_executive_s_Name__c=storeExcutiveName;
            insert td;
        }
        
    }
     @auraenabled
    public static void createhomeride(Id leadid,string testridename,datetime ridedate,string street,string city,string state,string country,string postalcode, boolean Indemnity,string dlnumber,string homeExcutiveName){
        system.debug('gg'+street+'='+city+'+'+homeExcutiveName+'='+postalcode);
        Test_Drive__c td=new Test_Drive__c();
        if(ridedate!=null&&city!=null&&street!=null){
        td.Lead__c=leadid;
        td.Name=testridename;
        td.Test_Ride_Date__c=ridedate;
        td.Address__Street__s=street;
            td.Address__City__s=city;
        // td.Address__StateCode__s=state;
            //td.Address__CountryCode__s=country;
            td.Address__PostalCode__s=postalcode;
            td.Ride_Type__c='Home Ride' ;
           // TD.Indemnity__c=Indemnity;
             td.Drivers_License_Number__c=dlnumber;
            td.Test_ride_executive_s_Name__c=homeExcutiveName;
            
        }
        insert td;
       
        }

       
        
    
    @auraenabled
    public static void leadcancelreason(Id leadid,string reason,string reasonfeedback){
        system.debug('llll'+leadid+'jbjk'+reason);
        list<Lead> uplead=[select Id,Lost_Reason__c,Status from Lead where Id=:leadid];
        List<Lead> updatelst=new list<Lead>();
        for(Lead l:uplead){
            l.Status='close lost' ;
            l.Lost_Reason__c=reason;
            l.Lost_Feedback__c=reasonfeedback;
            
            updatelst.add(l);
        }
         update updatelst;
      
        }
    
    @auraenabled
    public static void updatefollowup( string followupId){
        system.debug('eneter'+followupId);
         list<Follow_Up__c> correctfollowid=[select Id ,Status__c from Follow_Up__c where Id=:followupId];
        for(Follow_Up__c fu:correctfollowid){
            fu.Status__c='Completed';
            update fu;
    }
    }
     @auraenabled
    public static void updatedltestride(Id testrideId,string Dlnumber, boolean Indemnity){
        system.debug('ggjjksja'+testrideId+'atfsdgyhu'+Dlnumber+'45678'+Indemnity);
        list<Test_Drive__c> testrides=[select Id ,Indemnity__c,Drivers_License_Number__c from Test_Drive__c where Id=:testrideId ];
        for(Test_Drive__c td:testrides){
            td.Indemnity__c=Indemnity;
            td.Drivers_License_Number__c=Dlnumber;
            update td;
        }        
    }
     @auraenabled
    public static void updatedstatustestride(Id testrideId){
        system.debug('ggjjksja'+testrideId);
        list<Test_Drive__c> testrides=[select Id ,Test_Drive_Status__c from Test_Drive__c where Id=:testrideId ];
        for(Test_Drive__c td:testrides){
            td.Test_Drive_Status__c='Canceled';
            
            update td;
        }        
    }
     @auraenabled
    public static Id createnewfollowuptestride(id leadid,datetime followupdate, string feedbackvalue){
            system.debug('enter'+leadid+followupdate+feedbackvalue);
     //  Follow_Up__c followUpObj =[SELECT Id, Name,Lead__c,Status__c FROM Follow_Up__c WHERE Lead__c = :leadid  AND Status__c != 'Completed' ORDER BY CreatedDate DESC LIMIT 1];
               Follow_Up__c crfollowup=new Follow_Up__c();
        if(followupdate!=null&&feedbackvalue!=null){
            system.debug('enter'+leadid+followupdate+feedbackvalue);

        crfollowup.Lead__c=leadid;
        crfollowup.Follow_Up_Date__c=followupdate;
        crfollowup.Feedback__c =feedbackvalue;
            
        }
        insert crfollowup;
        return crfollowup.Id;
    }
    @Auraenabled
    public static void updatedstatustestridecomplete(Id testrideId){
        system.debug('ggjjksja'+testrideId);
        Test_Drive__c testride=[select Id ,Test_Drive_Status__c from Test_Drive__c where Id=:testrideId LIMIT 1];
        testride.Test_Drive_Status__c='Completed';
        system.debug('lllllllll'+testride.Test_Drive_Status__c);
        update testride;
      system.debug('query'+[select Id ,Test_Drive_Status__c from Test_Drive__c where Id=:testrideId LIMIT 1]);

     }
    @auraenabled
    public static void updatedtestdrivefeedback(Id testrideId,string feedback){
        system.debug('ggjjksja'+testrideId);
        list<Test_Drive__c> testrides=[select Id ,Test_Drive_Status__c from Test_Drive__c where Id=:testrideId ];
        for(Test_Drive__c td:testrides){
            td.Feedback__c=feedback;
            
            update td;
        }     
     }
  
   
}