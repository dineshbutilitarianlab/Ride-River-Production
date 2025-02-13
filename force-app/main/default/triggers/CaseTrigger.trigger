trigger CaseTrigger on Case (before insert, before Update) {
    Set<Id> caseIds = new Set<Id>();
    Set<String> caseIdsForVechile = new Set<String>();
    Set<String> caseIdsForCurrentOwnerVehicle = new Set<String>();
    List<ContentDocumentLink> relatedContentDocumentLinks = new List<ContentDocumentLink>();
    List<Vehicle> relatedVehicles = new List<Vehicle>();
    List<Vehicle> relatedVehiclesAll = new List<Vehicle>();
    
    // Collect Case Ids from the trigger context
    for (Case newCase : Trigger.new) {
        // Ensure we have a valid LinkedEntityId (Case Id)
        if (newCase.Id != null && newCase.Case_Type__C == 'Urgent Complaint' && newCase.Status == 'Closed') {
            caseIds.add(newCase.Id);
        }
        
        if(newCase.Case_Type__C != 'General Query' && newCase.Vehicle_Registration_Number__c == NULL && newCase.Vehicle__c == NULL){
            newCase.addError('You cannot create a case without Vehicle or VRN');
        }
        
        if(newCase.Vehicle_Registration_Number__c != NULL) {
            caseIdsForVechile.add(newCase.Vehicle_Registration_Number__c);
        }
        
        if(newCase.Case_Type__C != 'General Query' && newCase.Vehicle_Registration_Number__c == NULL && newCase.Vehicle__c != NULL) {
            caseIdsForCurrentOwnerVehicle.add(newCase.accountId);
        }
    }
    
    // Query ContentDocumentLink records related to the Case
    if(caseIds.size() > 0) {
        relatedContentDocumentLinks = [SELECT Id, LinkedEntityId FROM ContentDocumentLink WHERE LinkedEntityId IN :caseIds];
    }
    
    if(caseIdsForCurrentOwnerVehicle.size()>0) {
        relatedVehiclesAll = [SELECT Id, VehicleRegistrationNumber, CurrentOwnerId FROM Vehicle WHERE currentOwnerId IN :caseIdsForCurrentOwnerVehicle];
    }
    
    // Query fpr all vehicle relavent to records 
    if(caseIdsForVechile.size() > 0) {
        relatedVehicles = [SELECT Id, VehicleRegistrationNumber, CurrentOwnerId FROM Vehicle WHERE VehicleRegistrationNumber IN :caseIdsForVechile];
    }
    
    Map<String, Id> vinToOwnerMap = new Map<String, Id>();
    Map<String, Id> vinToVehicleMap = new Map<String, Id>();
    Map<String, String> vinToAccountVehicleMap = new Map<String, String>();
    //Map<Id, Vehicle> vehicleToRegistrationMap = new Map<Id, Vehicle>();
    
    for(Vehicle vehicle : relatedVehicles) {
        vinToOwnerMap.put(vehicle.VehicleRegistrationNumber, vehicle.CurrentOwnerId);
        vinToVehicleMap.put(vehicle.VehicleRegistrationNumber, vehicle.Id);
        //vehicleToRegistrationMap.put(vehicle.id, vehicle);
    }
    
    for(Vehicle vehicle : relatedVehiclesAll) {
        vinToAccountVehicleMap.put(vehicle.currentOwnerId, vehicle.VehicleRegistrationNumber);
    }
    
    // Create a set to store the Case Ids associated with ContentDocumentLink records
    Set<Id> caseIdsWithContentDocumentLinks = new Set<Id>();
    Map<Id, List<Customer_Feedback__c>> feedbackMap = new Map<Id, List<Customer_Feedback__c>>();
    
    // Add Case Ids with associated ContentDocumentLink records to the set
    for (ContentDocumentLink cdl : relatedContentDocumentLinks) {
        caseIdsWithContentDocumentLinks.add(cdl.LinkedEntityId);
    }
    
    for (Customer_Feedback__c feedback : [SELECT Id, Case__c, Issue_Type__c FROM Customer_Feedback__c WHERE Case__c IN :caseIds]) {
        if (!feedbackMap.containsKey(feedback.Case__c)) {
            feedbackMap.put(feedback.Case__c, new List<Customer_Feedback__c>());
        }
        feedbackMap.get(feedback.Case__c).add(feedback);
    }
    
    // Check if any Case Ids in Trigger.new don't have associated ContentDocumentLink records
    for (Case newCase : Trigger.new) {
        if (Trigger.isUpdate && newCase.Id != null && newCase.Case_Type__C == 'Urgent Complaint' && newCase.Status == 'Closed') {
            if (!caseIdsWithContentDocumentLinks.contains(newCase.Id)) {
                newCase.addError('Please ensure that a Customer Feedback Form is attached before proceeding to close the urgent case.');
            }
            if (feedbackMap.containsKey(newCase.Id)) {
                List<Customer_Feedback__c> feedbacks = feedbackMap.get(newCase.Id);
                Boolean isAnyMatch = false;
                
                for (Customer_Feedback__c feedback : feedbacks) {
                    if (feedback.Issue_Type__c == newCase.Case_Category__c||feedbacks.isEmpty()) {
                        isAnyMatch = true;
                        break; 
                    }
                }
                if (!isAnyMatch) {
                    newCase.addError('At least one related Customer Feedback Issue Type must match the Case Category.');
                }
            }
            else
            {
                newCase.addError('Related Customer Feedback is not Found!');
            }
        }
    
    
    //check for vehicle
    if(newCase.Vehicle_Registration_Number__c != NULL && newCase.Vehicle__c == NULL && !vinToOwnerMap.containsKey(newCase.Vehicle_Registration_Number__c)) {
        newCase.addError('Vehicle does not exists. Please check VRN Number.');
    }else if(newCase.Vehicle_Registration_Number__c != NULL && vinToOwnerMap.get(newCase.Vehicle_Registration_Number__c) != newCase.AccountId) {
        newCase.addError('This Vehicle is not related to Account.');
    }else if(newCase.Vehicle_Registration_Number__c != NULL && newCase.Vehicle__c == NULL && vinToOwnerMap.get(newCase.Vehicle_Registration_Number__c) == newCase.AccountId) {
        newCase.Vehicle__c = vinToVehicleMap.get(newCase.Vehicle_Registration_Number__c);
    }else if(newCase.Vehicle_Registration_Number__c != NULL &&  newCase.Vehicle__c != NULL && vinToVehicleMap.get(newCase.Vehicle_Registration_Number__c) != newCase.Vehicle__c){ 
        newCase.addError('Vehicle Registration Number is not matching with Respective Vehicle');
    }else if (newCase.Vehicle_Registration_Number__c == NULL && newCase.Vehicle__c != NULL) {
        /*Vehicle vehi = [SELECT id,VehicleRegistrationNumber,currentOwnerId from Vehicle where id =: newCase.Vehicle__c limit 1];
if(vehi.currentOwnerId != newCase.AccountId) {
newCase.addError('This Vehicle is not related to Account.');
}else{
newCase.Vehicle_Registration_Number__c = vehi.VehicleRegistrationNumber;          
}*/
        newCase.Vehicle_Registration_Number__c = vinToAccountVehicleMap.get(newCase.accountId);
    }
}
}