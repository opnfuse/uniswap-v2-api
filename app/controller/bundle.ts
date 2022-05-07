import axios from "axios";

const API_URL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2"

export const getBundle = async () => {
  // The payload to send to the GraphQL API
  const payload = {
    query: `{
      bundle(id:"1")
      {
          ethPrice
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
      return res.data.data.bundle.ethPrice;
    })
    .catch((err) => {
      throw err
    });

  // If the response is null then the uniswap factory address changed
  if (response === null) {
    throw new Error("Bundle not found")
  }

  return response;
}

