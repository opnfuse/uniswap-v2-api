import { Handler } from 'aws-lambda';
import { getUniswapFactory } from './controller/uniswapFactory';
import { getToken } from './controller/token';
import { getPair } from './controller/pair';
import { getTransaction } from './controller/transaction';
import { getSwap } from './controller/swap';
import { getBundle } from './controller/bundle';

export const uniswapFactory: Handler = async (event: any) => {
  try {
    // Get the response from the controller
    const res = await getUniswapFactory();

    // Building the response
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
    // Logging the error
    console.error(err);

    // Error response
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

export const token: Handler = async (event: any) => {
  try {
    // Get the response from the controller
    const res = await getToken(event.pathParameters.id);

    // Building the response
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Token Retrieved Successfully',
        data: res,
      })
    }

    return response;
  } catch (error) {
    // If the error message is not found then the token address is not found
    if (error.message === 'Token not found') {
      const response = {
        statusCode: 404,
        body: JSON.stringify({
          error: 'Not Found',
          message: 'Token not found',
        })
      }

      return response;
    }

    // Logging the error
    console.error(error);

    // Error response
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

export const pair: Handler = async (event: any) => {
  try {
    // Get the response from the controller
    const res = await getPair(event.pathParameters.id);

    // Building the response
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Pair Retrieved Successfully',
        data: res,
      })
    }

    return response;
  } catch (error) {
    // If the error message is not found then the token address is not found
    if (error.message === 'Pair not found') {
      const response = {
        statusCode: 404,
        body: JSON.stringify({
          error: 'Not Found',
          message: 'Pair not found',
        })
      }

      return response;
    }

    // Logging the error
    console.error(error);

    // Error response
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

export const transaction: Handler = async (event: any) => {
  try {
    // Get the response from the controller
    const res = await getTransaction(event.pathParameters.id);

    // Building the response
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Transaction Retrieved Successfully',
        data: res,
      })
    }

    return response;
  } catch (error) {
    // If the error message is not found then the token address is not found
    if (error.message === 'Transaction not found') {
      const response = {
        statusCode: 404,
        body: JSON.stringify({
          error: 'Not Found',
          message: 'Transaction not found',
        })
      }

      return response;
    }

    // Logging the error
    console.error(error);

    // Error response
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

export const swap: Handler = async (event: any) => {
  try {
    // Get the response from the controller
    const res = await getSwap(event.pathParameters.id);

    // Building the response
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Swap Retrieved Successfully',
        data: res,
      })
    }

    return response;
  } catch (error) {
    // If the error message is not found then the token address is not found
    if (error.message === 'Swap not found') {
      const response = {
        statusCode: 404,
        body: JSON.stringify({
          error: 'Not Found',
          message: 'Swap not found',
        })
      }

      return response;
    }

    // Logging the error
    console.error(error);

    // Error response
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

export const bundle: Handler = async (event: any) => {
  try {
    // Get the response from the controller
    const res = await getBundle();

    // Building the response
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'EHT Price Retrieved Successfully',
        data: res,
      })
    }

    return response;
  } catch (error) {
    // Logging the error
    console.error(error);

    // Error response
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