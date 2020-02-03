export class LiquidacionGenerada {

    
    
    public numero:string;
    public fecha_liquidacion  :Date;
    public estado  :string;
    
    

    constructor(
       
        numero:string,
        fecha_liquidacion :Date,
        estado :string
         

    ) {

        this.numero = numero;     
        this.fecha_liquidacion = fecha_liquidacion;            
        this.estado= estado;      
    }
}