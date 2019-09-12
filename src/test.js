const axios = require('axios')

const doTest = async (idx) => {
  const { data } = await axios.post(
    'http://localhost:3001/api/orders',
    {
      items: [
        {
          id: 4,
          qty: 5, 
          customer_id: 39
        },
        {
          id: 3,
          qty: 10,
          customer_id: 40
        }
      ]
    },
    {
      headers: {
        Authorization:
          'JWTx eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTkyLCJlbWFpbCI6ImFkbWluNDVAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkWC4yQ2ZBTVBESkt0V25wL3htUXpBT2RNVGkwWmY1V2w3VjVLN2xZbXQydGVic0ZmSHI2MEsiLCJuYW1lIjoiaGFwcHl4NSIsInVzZXJuYW1lIjoiNjgiLCJjcmVhdGVkQXQiOiIyMDE5LTA4LTI3VDEzOjEyOjU2LjM0NFoiLCJ1cGRhdGVkQXQiOiIyMDE5LTA4LTI3VDEzOjEyOjU2LjM0NFoiLCJpYXQiOjE1Njc4MzU1NjgsImV4cCI6MTU2ODA5MzU2OH0.g7NI_BrQqtWFKhwIY-LUppWUkD_HFT21h54eigUO4YU'
      }
    }
  )
  console.log(`Transaction id #${idx}`, data)
}

Promise.all([doTest(1), doTest(2), doTest(3), doTest(4)])
//Promise.all([doTest(1)])