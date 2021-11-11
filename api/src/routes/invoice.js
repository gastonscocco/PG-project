const {Router} = require("express");
const router = Router();
const Invoice = require('../models/Invoice');
const {invoiceCreate} = require('../controllers/index.js');

//POST NEW INVOICE
router.post('/',(req,res,next)=>{
  let data = req.body;
  invoiceCreate(data)
    .then(result => res.json(result))
    .catch(err => next(err));
});

//GET INVOICEs BY userId
router.get('/:customerId',(req,res,next)=>{
  let {customerId} = req.params;
  Invoice.find({customerId}).select('numberOfSessions orderID totalCost description date')
    // .populate([{path: 'customerId', select: 'username'},
    // {path: 'schedules',select: 'userId'}])
    .then(result => res.json(result))
    .catch(err => next(err));
});

//GET INVOICE BY professionalId (NOT WORKING YET)
//router.get('/',(req,res,next)=>{
//let {userId} = req.query;
//  Invoice.find({schedules: {$all:[{$elemMatch:{userId}}]}})
//     .populate([{path: 'customerId', select: 'username'},
//     {path: 'schedules',select: 'date userId'}])
//     .then(result => res.json(result))
//     .catch(err => next(err));
//     });

//DELETE one INVOICE :c
router.delete('/:id',(req,res,next)=>{
  let {id} = req.params;
  Invoice.findByIdAndDelete(id)
    .then(result => res.json(result))
    .catch(err => next(err));
});

module.exports = router;