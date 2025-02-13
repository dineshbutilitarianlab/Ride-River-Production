public class WorkOrderTriggerHandler {
    
    public static void handleTrigger(List<WorkPlan> newobjWorkPlan) {

        Set<Id> setobjWorkPlan = new Set<Id>();

        for (WorkPlan objWorkPlan : newobjWorkPlan) {
            if (objWorkPlan.Labour_Charge__c != null && objWorkPlan.WorkOrderId != null) {
                System.debug('objWorkPlan.WorkOrderId==?' + objWorkPlan.WorkOrderId);
                setobjWorkPlan.add(objWorkPlan.WorkOrderId);
            }
        }

        updateWorkPlan(setobjWorkPlan);
    }

    @future
    public static void updateWorkPlan(Set<Id> setobjWorkPlan) {

        System.debug('setobjWorkPlan==>' + setobjWorkPlan);
        List<WorkOrder> lstWorkorders = new List<WorkOrder>();

        List<WorkOrder> lstWorkorder = [SELECT Id, Total_Duration_Min__c, Total_Duration_Hour__c, Labour_Charge__c,
            (SELECT Id, Duration_Min__c, Duration_Hour__c, Labour_Charge__c FROM WorkPlans)
            FROM WorkOrder WHERE Id IN :setobjWorkPlan];

        System.debug('lstWorkorder==>' + lstWorkorder);

        for (WorkOrder objWorkOrder : lstWorkorder) {
            Decimal totalMinutes = 0;
            Decimal totalHours = 0;
            Decimal totalCharge = 0;

            for (WorkPlan objobjWorkPlan : objWorkOrder.WorkPlans) {
                if (objobjWorkPlan != null) {
                    if (objobjWorkPlan.Duration_Min__c != null) {
                        totalMinutes += objobjWorkPlan.Duration_Min__c;
                    }
                    if (objobjWorkPlan.Duration_Hour__c != null) {
                        totalHours += objobjWorkPlan.Duration_Hour__c;
                    }
                    if (objobjWorkPlan.Labour_Charge__c != null) {
                        totalCharge += objobjWorkPlan.Labour_Charge__c;
                        System.debug('totalCharge==>' + totalCharge);
                    }
                }
            }
            
           // Convert excess minutes to hours
            if (totalMinutes >= 60) {
                Decimal hoursToAdd = Math.floor(totalMinutes / 60);
                totalHours += hoursToAdd;
                totalMinutes -= hoursToAdd * 60;
            }
            objWorkOrder.Total_Duration_Min__c = totalMinutes;
            objWorkOrder.Total_Duration_Hour__c = totalHours;
            objWorkOrder.Labour_Charge__c = totalCharge;
            
            lstWorkorders.add(objWorkOrder);
        }

        update lstWorkorders;
    }
}