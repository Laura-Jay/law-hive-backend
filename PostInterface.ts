export interface PostInterface {
    id: number,
    title: string,
    description: string,
    feeStructure: string,
    feeAmount?: number,
    feePercentage?: number, 
    state: "Started" | "Paid"
}