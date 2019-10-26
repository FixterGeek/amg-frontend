export function normalizeDate(eventData) {
    const normalizedData = { ...eventData }
    delete normalizedData.modules;
    delete normalizedData.assistants;
    delete normalizedData.courses
    const id = normalizedData._id;
    delete normalizedData._id;
    return { normalizedData, id };
}

export function transformToFormData(formData, obj, parentKey) {
    if (parentKey) {
        for (let k in obj) {
            formData.append(`${parentKey}[${k}]`, obj[k])
        }
    }
    else {
        for (let k in obj) {
            if (k === "permisos" || k === "mainImages" || k === 'thumbnailImages') {
                formData.append(k, obj[k])
                continue
            }
            if (Array.isArray(obj[k]) || typeof obj[k] === "object") {
                formData.append(k, JSON.stringify(obj[k]))
                continue
            }
            // if (typeof obj[k] === "object") transformToFormData(formData, obj[k], k)
            else formData.append(k, obj[k])
        }
    }
    return formData
}