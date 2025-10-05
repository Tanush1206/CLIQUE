const Event = require('../models/Event');

function buildEventQuery(query) {
  const filter = { isPublished: true };
  if (query.category) filter.category = query.category;
  if (query.featured) filter.isFeatured = query.featured === 'true';
  if (query.from || query.to) {
    filter.startAt = {};
    if (query.from) filter.startAt.$gte = new Date(query.from);
    if (query.to) filter.startAt.$lte = new Date(query.to);
  }
  if (query.search) {
    filter.$or = [
      { title: { $regex: query.search, $options: 'i' } },
      { description: { $regex: query.search, $options: 'i' } },
      { tags: { $in: [new RegExp(query.search, 'i')] } },
    ];
  }
  return filter;
}

exports.list = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || '20', 10), 1), 100);
    const skip = (page - 1) * limit;

    const filter = buildEventQuery(req.query);
    const [data, total] = await Promise.all([
      Event.find(filter).sort({ startAt: -1 }).skip(skip).limit(limit),
      Event.countDocuments(filter),
    ]);

    res.json({
      data,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.read = async (req, res, next) => {
  try {
    const item = await Event.findOne({ slug: req.params.slug, isPublished: true });
    if (!item) return res.status(404).json({ error: 'Event not found' });
    res.json({ data: item });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    // TODO: add admin guard
    const created = await Event.create(req.body);
    res.status(201).json({ data: created });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    // TODO: add admin guard
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Event not found' });
    res.json({ data: updated });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    // TODO: add admin guard
    const removed = await Event.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Event not found' });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};
