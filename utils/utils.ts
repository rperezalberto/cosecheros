export const LoadImg = async (uri: string) => {
    try {
        const response = await fetch(uri);
        const blob = await response.blob();
        return blob;
    } catch (error) {
        console.log("Error al cargar la imagen con XMLHttpRequest:", error);
        throw error;
    }
};
