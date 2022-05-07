import axios from "axios";

const API_URL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2"

export const getEthPrice = async () => {
  // The payload to send to the GraphQL API
  const payload = {
    query: `{
      bundle(id:"1")
      {
          id
          ethPrice
      }
      }`
  }

  const JSONpayload = JSON.stringify(payload)

  // The response from the GraphQL API
  const response = await axios
    .post(
      API_URL,
      JSONpayload,
    )
    .then((res) => {
      // Returning the response data
      return res.data.data.bundle.ethPrice;
    })
    .catch((err) => {
      throw err
    });

  return response;
}