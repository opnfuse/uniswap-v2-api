import axios from "axios";
import { getEthPrice } from "../utils/ethPrice";

const API_URL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2"

export const getSwap = async (id: string) => {
  // The payload to send to the GraphQL API
  const payload = {
    query: `{
      swap(id:"${id}")
      {
          id
          transaction
          {
              id
              blockNumber
              timestamp
          }
          timestamp
          pair
          {
              id
              token0
              {
                  id
                  symbol
                  name
                  decimals
                  totalSupply
                  tradeVolume
                  tradeVolumeUSD
                  untrackedVolumeUSD
                  txCount
                  totalLiquidity
                  derivedETH
              }
              token1
              {
                  id
                  symbol
                  name
                  decimals
                  totalSupply
                  tradeVolume
                  tradeVolumeUSD
                  untrackedVolumeUSD
                  txCount
                  totalLiquidity
                  derivedETH
              }
          }
          sender
          amount0In
          amount1In
          amount0Out
          amount1Out
          to
          logIndex
          amountUSD
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
      return res.data.data.swap;
    })
    .catch((err) => {
      throw err
    });

  // If the response is null then the token address is not found
  if (response === null) {
    throw new Error("Swap not found")
  }

  const price = await getEthPrice();

  // If the price is string then the price was retrieved successfully
  if (typeof price === 'string') {
    // Calculating the price in USD based in the eth price and the derivedETH price of the tokens
    response.pair.token0.derivedUSD = String(parseFloat(response.pair.token0.derivedETH) * parseFloat(price));
    response.pair.token1.derivedUSD = String(parseFloat(response.pair.token1.derivedETH) * parseFloat(price));
  }

  return response;
}