import axios from "axios";
import { getEthPrice } from "../utils/ethPrice";

const API_URL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2"

export const getToken = async (id: string) => {
  // The payload to send to the GraphQL API
  const payload = {
    query: `{
      token(id:"${id}") {
        id
        symbol
        name
        decimals
        tradeVolume
        tradeVolumeUSD
        untrackedVolumeUSD
        txCount
        totalLiquidity
        derivedETH
      }
      }`
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
      return res.data.data.token;
    })
    .catch((err) => {
      throw err
    });

  // If the response is null then the token address is not found
  if (response === null) {
    throw new Error("Token not found")
  }

  const price = await getEthPrice();

  // If the price is string then the price was retrieved successfully
  if (typeof price === 'string') {
    // Calculating the price in USD based in the eth price and the derivedETH price of the token
    response.derivedUSD = String(parseFloat(response.derivedETH) * parseFloat(price));
  }

  return response;
}