export const handleStatusError = (setErrorsForms, nameE, messegue) => {
    setErrorsForms(
        prev => ({
            ...prev, [nameE]: messegue
        })
    )
}