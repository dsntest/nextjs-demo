"use client"
import axios from 'axios';

export const OPENAI_URL = "api.openai.com";
const DEFAULT_PROTOCOL = "https";
const PROTOCOL = process.env.PROTOCOL ?? DEFAULT_PROTOCOL;
const BASE_URL = process.env.BASE_URL ?? OPENAI_URL;
let baseUrl = BASE_URL;

if (!baseUrl.startsWith("http")) {
  baseUrl = `${PROTOCOL}://${baseUrl}`;
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { text } = req.body;

    try {
      // 向ChatGPT API发送用户输入的文本
      const response = await axios.post(`${baseUrl}/api/openai/v1/chat/completions`, {
        messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: text }],
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      // 提取ChatGPT的回答
      const botReply = response.data.choices[0].message.content;

      // 将回答发送回客户端
      res.status(200).json({ text: botReply });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
  } else {
    res.status(404).json({ error: 'Endpoint not found.' });
  }
}
