function mensajeError(campos) {
  const faltantes = campos
    .filter(campo => !campo.valor) //Filtra campos sin valor
    .map(campo => campo.nombre); //Extrae solo los nombres

  if (!faltantes.length) return '';

  return faltantes.length > 1
    ? `Los campos ${faltantes.slice(0, -1).join(', ')} y ${faltantes.slice(-1)} son requeridos`
    : `El ${faltantes[0]} es requerido`;
}

const { id_usuario, fecha, notas } = { id_usuario: 2, fecha: null };

const camposFaltantes = mensajeError([
  { nombre: 'id_usuario', valor: id_usuario },
  { nombre: 'fecha', valor: fecha }
]);

console.log(camposFaltantes);