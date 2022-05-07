import axios from "axios";

const API_URL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2"

export const getTransaction = async (id: string) => {
  // The payload to send to the GraphQL API
  const payload = {
    query: `{
      transaction(id:"${id}")
      {
          id
          blockNumber
          timestamp
          mints(skip:0)
          {
              id
          }
          burns(skip:0)
          {
              id
          }
          swaps(skip:0)
          {
              id
          }
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
      return res.data.data.transaction;
    })
    .catch((err) => {
      throw err
    });

  // If the response is null then the token address is not found
  if (response === null) {
    throw new Error("Transaction not found")
  }

  return response;
}