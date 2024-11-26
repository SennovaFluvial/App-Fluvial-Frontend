import { Select } from '@mui/material'

export const SelectToChangeStatus = ({ options, name, onClick, value }) => {
    return (
        <>
            <Select
                name={name}
                value={value}
                options={options}
                event={onClick}
            />
        </>
    )
}
