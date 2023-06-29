import data from '../../../../../mockData.json';

export const generateScript = async (context: any) => {
  try {
    const bulkData = data.flatMap((item: any) => [
      { index: { _index: 'messages' } },
      item,
    ]);

    const result = await context.elasticClient.bulk({ body: bulkData });

    if (result?.errors) {
      console.error('Error al enviar los datos en modo bulk:', result.errors);
      return {
        error: 'Error al enviar los datos en modo bulk',
        message: null,
      };
    }

    return {
      error: null,
      message: 'Datos agregados exitosamente en modo bulk',
    };
  } catch (error) {
    console.error('Error al enviar los datos en modo bulk:', error);
    return {
      error: 'Error al enviar los datos en modo bulk',
      message: null,
    };
  }
};
