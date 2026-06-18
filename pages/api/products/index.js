import dbConnect from '../../../lib/dbConnect'
import Product from '../../../models/Product'

export default async function handler(req, res) {
  await dbConnect()

  if (req.method === 'GET') {
    try {
      const { category, search, featured } = req.query
      let filter = {}
      if (category) filter.category = category
      if (featured) filter.isFeatured = true
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { brand: { $regex: search, $options: 'i' } },
        ]
      }
      const products = await Product.find(filter).sort({ createdAt: -1 })
      return res.status(200).json({ products })
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message })
    }
  }

  if (req.method === 'POST') {
    try {
      const product = await Product.create(req.body)
      return res.status(201).json({ product })
    } catch (error) {
      return res.status(400).json({ message: 'Error creating product', error: error.message })
    }
  }

  return res.status(405).json({ message: 'Method not allowed' })
}
