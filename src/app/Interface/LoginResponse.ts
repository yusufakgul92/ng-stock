export interface LoginResponse{
    data: {
        userGroup:number,
        token:string
    },
    status:number,
    error:string
}