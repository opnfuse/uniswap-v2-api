import axios from "axios";

const API_URL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2"

export const getUniswapFactory = async () => {
  // The payload to send to the GraphQL API
  const payload = {
    query: `{
      uniswapFactory(id:"0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f") {
        id
        pairCount
        totalVolumeUSD
        totalVolumeETH
        untrackedVolumeUSD
        totalLiquidityUSD
        totalLiquidityETH
        txCount
      }
      }
      `
  }

  // Converting the payload to JSON
  const JSONpayload = JSON.stringify(payload)

  // The response from the GraphQL API
  const response = await axios
    .post(
      API_URL,
      JSONpayload,
    )
    .then((res) => {
      // Returning the response data
      return res.data.data.uniswapFactory;
    })
    .catch((err) => {
      throw err
    });

  // If the response is null then the uniswap factory address changed
  if (response === null) {
    throw new Error("Uniswap Factory not found")
  }

  return response;
}

