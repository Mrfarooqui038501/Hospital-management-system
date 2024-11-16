const Service = require('../models/Service');
const { validateService } = require('../validators/serviceValidator');
const { NotFoundError, ValidationError } = require('../utils/errors');
const { getPagination } = require('../utils/pagination');

exports.getAllServices = async (req, res, next) => {
  try {
    const { page, limit, search, category, sort } = req.query;
    const query = {};
    
    if (search) {
      query.$text = { $search: search };
    }
    
    if (category) {
      query.category = category.toUpperCase();
    }

    const { skip, take } = getPagination(page, limit);
    const sortOption = sort ? { [sort]: 1 } : { createdAt: -1 };

    const [services, total] = await Promise.all([
      Service.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(take),
      Service.countDocuments(query)
    ]);

    res.json({
      data: services,
      pagination: {
        total,
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.createService = async (req, res, next) => {
  
  try {
    const validatedData = await validateService(req.body);
    const service = await Service.create(validatedData);
    res.status(201).json({ data: service });
  } catch (error) {
    next(error);
  }
};

exports.updateService = async (req, res, next) => {
  try {
    const validatedData = await validateService(req.body);
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true, runValidators: true }
    );

    if (!service) {
      throw new NotFoundError('Service not found');
    }

    res.json({ data: service });
  } catch (error) {
    next(error);
  }
};

exports.deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    
    if (!service) {
      throw new NotFoundError('Service not found');
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};