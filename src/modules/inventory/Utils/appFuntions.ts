export const getErrorMessage = (controller: string, validationType: string) => {
    console.log('controller, getErrorMessage', controller, validationType)
    switch (validationType) {
        case 'required':
            return `${controller} is required`;

        case "pattern": 
           return `Please enter valid data`
        // break;
        default:
            return ''
        // break
    }
    // return ''
}