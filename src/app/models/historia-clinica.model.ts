export class HistoriaClinica {
    dni:string;
    paciente_id:string;
    
    matricula_id:string;
    MEDICO:string;
    MEDICONOM:string;
    id:string;
    FECHA:string;
    MC:string;
    AEA:string;
    APP:string;
    AF:string;
    COMENTARIO:string;
    FO:string;
    CVC:string;
    OBSERVACION:string;
    SINTOMAS:string;
    medico_id:string;
    nombreyapellido:string;
    usuario_id:string;
    PACIENTE:string;    
    plan:string;
    numero_afiliado:string;
    edad:string;
    obra_social_nombre:string;
    TRATAMIENT:string;
    paciente_nombre:string;
    DIAGNOSTIC:string;  
    SINTOMAS_SIGNOS:string;
    TRATAMIENTO_MEDICO:string;
    TRATAMIENTO_QUIRURGICO:string;
    domicilio:string;
    paciente_obra_social_id:string;
    barra_afiliado:string;    
    historia_clinica:HistoriaClinica[];
    estudio_id:string;
    estudio_nombre:string;
    ESTUDIOS:string;
    MEDICACION:string;
    DIAGNOSTICO:string;
    TRATAMIENTO:string;

    constructor( 
        paciente_id:string,
        matricula_id:string,
        MEDICO:string,
        MEDICONOM:string,
        id:string,
        FECHA:string,
        MC:string,
        AEA:string,
        APP:string,
        AF:string,
        COMENTARIO:string,
        FO:string,
        CVC:string,
        OBSERVACION:string,
        SINTOMAS:string,
        medico_id:string,
        nombreyapellido:string,
        usuario_id:string,
        PACIENTE:string,
        plan:string,
        numero_afiliado:string,
        edad:string,
        obra_social_nombre:string,
        TRATAMIENT:string,
        paciente_nombre:string,
        DIAGNOSTIC:string,
        dni:string,
        SINTOMAS_SIGNOS:string,
        TRATAMIENTO_MEDICO:string,
        TRATAMIENTO_QUIRURGICO:string,
        domicilio:string,
        paciente_obra_social_id:string,
        barra_afiliado:string,
        historia_clinica:HistoriaClinica[],
        estudio_id:string,
        estudio_nombre:string,
        ESTUDIOS:string,
        MEDICACION:string,
        DIAGNOSTICO:string,
        TRATAMIENTO:string
        ) {
       
            this.paciente_id= paciente_id;
            this.matricula_id= matricula_id;
            this.MEDICO= MEDICO;
            this.MEDICONOM= MEDICONOM;
            this.id= id;
            this.FECHA= FECHA ;
            this.COMENTARIO= COMENTARIO;
            this.FO= FO;
            this.CVC= CVC;
            this.OBSERVACION= OBSERVACION;
            this.SINTOMAS= SINTOMAS;
          
            this.medico_id =medico_id;
            this.nombreyapellido =nombreyapellido;
            this.usuario_id =usuario_id;
            this.PACIENTE = PACIENTE;
            this.plan = plan;
            this.numero_afiliado = numero_afiliado;
            this.edad = edad;
            this.obra_social_nombre =obra_social_nombre;
            this.TRATAMIENT = TRATAMIENT;
            this.paciente_nombre = paciente_nombre;
            this.DIAGNOSTIC = DIAGNOSTIC;
            this.dni = dni;          
            this.SINTOMAS_SIGNOS =           
            this.TRATAMIENTO_MEDICO = TRATAMIENTO_MEDICO;
            this.TRATAMIENTO_QUIRURGICO =TRATAMIENTO_QUIRURGICO;
            this.domicilio = domicilio;
            this.paciente_obra_social_id = paciente_obra_social_id;
            this.barra_afiliado = barra_afiliado;
            this.historia_clinica = historia_clinica;
            this.estudio_id = estudio_id;
            this.estudio_nombre = estudio_nombre;
            this.ESTUDIOS = ESTUDIOS;
            this.MEDICACION = MEDICACION;
            this.DIAGNOSTICO = DIAGNOSTICO;
            this.TRATAMIENTO = TRATAMIENTO;
   }
}