import axios from "axios";

const API_URL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2"

export const getUniswapFactory = async () => {

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

  const JSONpayload = JSON.stringify(payload)

  const response = await axios
    .post(
      API_URL,
      JSONpayload,
    )
    .then((res) => {
      return res.data.data.uniswapFactory;
    })
    .catch((err) => {
      throw err
    });

  if (response === null) {
    throw new Error("Uniswap Factory not found")
  }

  return response;
}

