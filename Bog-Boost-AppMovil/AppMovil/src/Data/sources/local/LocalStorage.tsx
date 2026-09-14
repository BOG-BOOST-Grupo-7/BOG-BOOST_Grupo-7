import AsyncStorage from '@react-native-async-storage/async-storage';
// Proveedor de almacenamiento local personalizado. Expone métodos asíncronos para interactuar con AsyncStorage de React Native.

export const LocalStorage = () => {
    // Almacena una cadena de texto en el almacenamiento persistente asociada a una clave específica.
    const save = async (key: string, value: string) => {
        try { // Intenta guardar el par clave-valor en el dispositivo.
            await AsyncStorage.setItem(key, value);
        } catch (error) { // Captura e imprime errores si la escritura falla.
            console.log('Error en Local Storage: ' + error);
        }
    }
    // Recupera un elemento del almacenamiento persistente utilizando su clave de identificación.
    const getItem = async (key: string) => {
        try { // Intenta obtener el valor asociado a la clave suministrada.
            const item = await AsyncStorage.getItem(key);
            return item;
        } catch (error) { // Captura el error, lo imprime y retorna un valor nulo en caso de falla.
            console.log('Error en Local Storage: ' + error);
            return null;
        }
    }
    // Elimina de forma permanente un registro del almacenamiento persistente mediante su clave.
    const remove = async (key: string) => {
        try { // Intenta remover la información ligada a la clave del dispositivo.
            await AsyncStorage.removeItem(key);
        } catch (error) { // Captura e imprime errores si la eliminación falla.
            console.log('Error en Local Storage: ' + error);
        }
    }
    // Retorna las funciones de guardar, obtener y eliminar para que puedan ser utilizadas por el repositorio.
    return {
        save,
        getItem,
        remove
    }
}