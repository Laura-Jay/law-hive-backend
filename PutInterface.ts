export interface PutInterface {
    amountPaid: number,
    settlementAmount: number, 
    state: "Started" | "Paid"
}