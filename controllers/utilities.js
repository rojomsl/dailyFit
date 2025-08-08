export default function mensajeRequeridos(campos) {
  const faltantes = campos
    .filter(campo => !campo.valor)  //Filtra campos sin valor
    .map(campo => campo.nombre);    //Extrae solo los nombres

  if (!faltantes.length) return false;

  return faltantes.length > 1
    ? `Los campos ${faltantes.slice(0, -1).join(', ')} y ${faltantes.slice(-1)} son requeridos`
    : `El ${faltantes[0]} es requerido`;
}