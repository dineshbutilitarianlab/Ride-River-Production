/**
 * @author Dinesh Baddawar
 * @email dinesh.butilitarianlab@gmail.com
 * @create date 2024-12-11 23:03:34
 * @modify date 2025-01-17 19:20:16
 * @desc [InitialAllotment Comp LWC]
 */

import getProductRequestItemsWithAvailableQty from '@salesforce/apex/ProductRequestLineController.getProductRequestItemsWithAvailableQty';
import updateRequestLineItem from '@salesforce/apex/ProductRequestLineController.updateRequestLineItem';
import { CloseActionScreenEvent } from 'lightning/actions';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { LightningElement, api, track, wire } from 'lwc';

export default class InitialAllotment extends LightningElement {
    @api recordId;
    @track requestLineItems = [];
    @track updatedValues = new Map(); 
    @track selectAllChecked = false; 
    showSpinner = false;

    connectedCallback(){
        debugger;
        this.recordId = this.recordId;
    }

    @wire(getProductRequestItemsWithAvailableQty, { recordId: '$recordId' })
    wiredProductRequestItems({ error, data }) {
        if (data) {
            debugger;
            this.requestLineItems = data.map((item,index) => ({
                // Id: res.Id,
                // Name: res.ProductRequestLineItemNumber,
                // ProductName: res.Product2?.Name || 'N/A',
                // ProductCode: res.Product_Code__c,
                // QuantityRequested: res.QuantityRequested,
                // AllocatedQuantity: res.Alloted_Quantity__c,
                // selected: false,
                // isChargesDisabled: true,
                index:index+1,
                Id: item.Id,
                Name: item.ProductRequestLineItemNumber,
                ProductName: item.ProductName || 'N/A',
                ProductCode: item.ProductCode,
                QuantityRequested: item.QuantityRequested,
                AllocatedQuantity: item.AllocatedQuantity ||0,
                QuantityOnHand: item.QuantityOnHand || 0,
                selected: false, 
                isChargesDisabled: true
                }));
                
            
            this.showSpinner = false;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.requestLineItems = [];
            console.error('Error fetching product request items:', error);
        }
    }
    
       
    

    // Handle input changes in quantity
    handleInputChange(event) {
        debugger;
        const rowId = event.target.dataset.id;
        const updatedValue = event.target.value; 
        this.updatedValues.set(rowId, updatedValue); 
        console.log('Updated Values Map:', Array.from(this.updatedValues.entries()));
    }

    closeQuickAction() {
        this.dispatchEvent(new CloseActionScreenEvent());
    }

    handleUpdateProcess() {
        debugger;
        this.showSpinner = true;

        this.requestLineItems.forEach(item => {
            if (!this.updatedValues.has(item.Id)) {
                this.updatedValues.set(item.Id, item.AllocatedQuantity);
            }
        });
        
        for (let [id, value] of this.updatedValues.entries()) {
            const item = this.requestLineItems.find(item => item.Id === id);

            if (item && parseFloat(value) > item.QuantityRequested) {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: `Allocated Quantity cannot be greater than Requested Quantity for Product: ${item.ProductName}`,
                        variant: 'error'
                    })
                );
                this.showSpinner = false;
                return;
            }

            if (parseFloat(value) > item.QuantityOnHand) {
                debugger;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: `Allocated Quantity cannot exceed Quantity On Hand for Product: ${item.ProductName}`,
                        variant: 'error'
                    })
                );
                this.showSpinner = false;
                return;
            }

              if (value === undefined || value === null || value === '') {
                debugger;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: `Allocated Quantity cannot be Null / Zero / Blank for Product: ${item.ProductName}`,
                        variant: 'error'
                    })
                );
                this.showSpinner = false;
                return;
            }
        
        }
        

        const updatedItems = Array.from(this.updatedValues.entries()).map(([id, value]) => {
            const item = this.requestLineItems.find(item => item.Id === id);
            return {
                Id: id,
                Alloted_Quantity__c: parseFloat(value),
                Product2Id: item?.Product2?.Id
            };
        });

        if(updatedItems.length == null){
             this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: `Please Provide Allocated Quantity before update !`,
                        variant: 'error'
                    },
                
                this.dispatchEvent(new CloseActionScreenEvent())
                )
                );
                
                return;
        }
        
        updateRequestLineItem({ updatedItems })
        
            .then(() => {
                debugger;
                this.showSpinner = false;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Records updated successfully',
                        variant: 'success'
                    })
                );
                this.updatedValues.clear();
                this.dispatchEvent(new CloseActionScreenEvent());
                window.location.replace(`/lightning/r/ProductRequest/`+this.recordId+'/view');
            })
            .then(() => {
                   })
            .catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'Error updating records: ' + error.body.message,
                        variant: 'error'
                    })
                );
                console.error('Error updating records:', error);
            });
    }
    
    // Handle the "Select All" checkbox change
    // handleSelectAll(event) {
    //     const isChecked = event.target.checked;
    //     this.selectAllChecked = isChecked;

    //     this.requestLineItems = this.requestLineItems.map(item => ({
    //         ...item,
    //         selected: isChecked,
    //         isChargesDisabled: !isChecked // Enable/disable the field
    //     }));
    // }

    // handleCheckboxChange(event) {
    //     const itemId = event.target.dataset.id;
    //     const isChecked = event.target.checked;

    //     this.requestLineItems = this.requestLineItems.map(item => {
    //         if (item.Id === itemId) {
    //             return {
    //                 ...item,
    //                 selected: isChecked,
    //                 isChargesDisabled: !isChecked 
    //             };
    //         }
    //         return item;
    //     });

    //     this.selectAllChecked = this.requestLineItems.every(item => item.selected);
    // }
}