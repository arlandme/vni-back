const Customer = require('../models/Customer');
const { ObjectId } = require('mongodb');

class CustomerController {
  // Get all
  search(req, res) {
    // let page = req.body.page || 1;
    // let pageSize = req.body.pageSize || 10;
    let sortName = req.body.sortName;
    let sort = {order: -1};
    const myQuery = {
      id: { $exists: true },
      name: { $regex: `.*${req.body.name}.*`, $options: 'i' },
      active: true,
    };

    let aggregateQuery = [
      { $match: myQuery },
    ];

    if (sortName) {
      sort.name = sortName;
    }
    aggregateQuery.push({ $sort: sort });

    Customer.aggregate(aggregateQuery)
      // .skip(page * pageSize - pageSize)
      // .limit(pageSize)
      .then((customers) => res.json(customers))
      .catch((err) => res.status(400).json('Error: ' + err.message));
  }

  // Get by id
  getById(req, res) {
    const myQuery = { _id: ObjectId(req.params._id), active: true };
    let aggregateQuery = [
      { $match: myQuery },
    ];
    Customer.aggregate(aggregateQuery)
      // .skip(page * pageSize - pageSize)
      // .limit(pageSize)
      .then((customers) => res.json(customers[0]))
      .catch((err) => res.status(400).json('Error: ' + err.message));
  }

  // Get by path
  getByPath(req, res) {
    const myQuery = { path: req.params.path, active: true };
    let aggregateQuery = [
      { $match: myQuery },
    ];
    Customer.aggregate(aggregateQuery)
      // .skip(page * pageSize - pageSize)
      // .limit(pageSize)
      .then((customers) => res.json(customers[0]))
      .catch((err) => res.status(400).json('Error: ' + err.message));
  }

  // Create
  create(req, res) {
    let customer;
    Customer.find()
      .sort({ id: -1 })
      .limit(1)
      .then((data) => {
        const newId = data.length > 0 ? data[0].id + 1 : 1;
        customer = new Customer({
          id: newId,
          name: req.body.name,
          path: req.body.path,
          thumbnail: req.body.thumbnail,
          link: req.body.link,
          description: req.body.description,
        });
        customer.save((err, customer) => {
          if (err) {
            return res.status(400).json('Cannot save!');
          } else {
            return res
              .status(200)
              .json('Created successful with customer: ' + customer.name);
          }
        });
      });
  }

  // update
  async update(req, res) {
    Customer.findOne({ _id: ObjectId(req.body._id) })
      .then((customer) => {
        if (!customer)
          return res.status(404).json({ message: 'Customer not founded!' });
        customer.name = req.body.name;
        customer.path = req.body.path;
        customer.thumbnail = req.body.thumbnail;
        customer.link = req.body.link;
        customer.description = req.body.description;
        customer.order = req.body.order;
        customer.save((err) => {
          if (err) return res.status(500).json({ message: err.message });
          else res.status(200).json({ message: 'Updated successful!' });
        });
      })
      .catch((err) => res.status(422).json({ message: 'Cannot find' }));
  }

  // Delete
  delete(req, res) {
    const myQuery = { id: req.body.id, active: true };
    Customer.findOne(myQuery)
      .then((customer) => {
        if (customer) {
          customer.active = false;
          customer.save((err) => {
            if (err) return res.status(400).json('Error deleting customer');
            else
              return res
                .status(200)
                .json(`Successfully deleted customer: ${customer.name}`);
          });
        } else return res.status(404).json('Customer not found');
      })
      .catch((err) => res.status(404).json(`Error!!!`));
  }
}

module.exports = new CustomerController();
