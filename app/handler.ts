import { Handler } from 'aws-lambda';
import { getUniswapFactory } from './controller/uniswapFactory';

export const uniswapFactory: Handler = async (event: any) => {
  try {
    const res = await getUniswapFactory();
    const response = {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Uniswap Factory Retrieved Successfully',
          data: res,
        },
        null,
        2
      ),
    };

    return response;
  } catch (err) {
    console.error(err);
    const response = {
      statusCode: 500,
      body: JSON.stringify(
        {
          error: 'Internal Server Error',
          message: 'Internal Server Error',
        })
    }
    return response;
  }
}