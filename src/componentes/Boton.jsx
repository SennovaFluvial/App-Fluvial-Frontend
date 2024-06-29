
const BotonType = ({ text, option }) => {
    return (
        <button className={(option == 1) ? 'btn btn-primary' : 'btn btn-danger'} > {text} </button>
    )
}

export const Boton = ({ text, option }) => {
    return (
        <>
            <BotonType text={text} option={option} ></BotonType>
        </>
    )
}
