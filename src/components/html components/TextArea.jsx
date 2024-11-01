

export const TextArea = ({ value, onChange, name, rows, placeholder }) => {
    return (
        <>
            <div className="form-group">
                <label htmlFor={name}>{placeholder}</label>
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="form-control"
                    rows={rows || 5}
                    placeholder={placeholder}
                />
            </div>
        </>
    )
}