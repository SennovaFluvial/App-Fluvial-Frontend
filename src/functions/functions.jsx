// Obtener las etiquetas de los campos del formulario
export const getLabelForField = (fieldName) => {
    const labelElement = document.querySelector(`label[for="${fieldName}"]`);
    return labelElement ? labelElement.textContent : fieldName;
};