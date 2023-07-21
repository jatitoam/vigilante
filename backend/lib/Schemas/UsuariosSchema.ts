export function usuariosSchema() {
    return {
       uuid: { type: String, required: true},
       nombres: { type: String, required: true },
       apellidos: { type: String, required: true },
       identificacion: { type: String},
       usuario: { type: String},
       contraseña: { type: String, required: true},
       admin: { type: Boolean, required: true},
       supervisor: { type: Boolean, required: true},
    };
}