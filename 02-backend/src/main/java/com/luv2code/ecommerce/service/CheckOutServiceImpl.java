package com.luv2code.ecommerce.service;

import com.luv2code.ecommerce.dao.CustomerRepository;
import com.luv2code.ecommerce.dto.PaymentInfo;
import com.luv2code.ecommerce.dto.Purchase;
import com.luv2code.ecommerce.dto.PurchaseResponse;
import com.luv2code.ecommerce.entity.Customer;
import com.luv2code.ecommerce.entity.Order;
import com.luv2code.ecommerce.entity.OrderItem;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CheckOutServiceImpl implements CheckOutService {

    private CustomerRepository customerRepository;

    @Autowired
    public CheckOutServiceImpl(CustomerRepository customerRepository, @Value("${stripe.key.secret}") String secretKey) {
        this.customerRepository = customerRepository;

//        initialize Stripe API with secret key
        Stripe.apiKey = secretKey;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
//        retrieve the order info from dto
        Order order = purchase.getOrder();

//        generate tracking number
        String orderTrackingNumber = generateTrackingNumber();
        order.setOrderTrackingNumber((orderTrackingNumber));

//        populate order with orderItems
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));

//        populate order with billingaddress and shippingaddress
        order.setShippingAddress((purchase.getShippingAddress()));
        order.setBillingAddress((purchase.getBillingAddress()));

//        populate customer with order
        Customer customer = purchase.getCustomer();

//        check if this is an existing customer
        String customerEmail = customer.getEmail();

        Customer customerDB = customerRepository.findByEmail(customerEmail);

        if (customerDB != null) {
            customer = customerDB;
        }

        customer.add(order);

//        save to the database
        customerRepository.save(customer);

//        return a response
        return new PurchaseResponse(orderTrackingNumber);
    }

    @Override
    public PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException {
//        Setup PaymentInfo Method types
        List<String> paymentMethodTypes=new ArrayList<>();
        paymentMethodTypes.add("card");

        Map<String,Object> params= new HashMap<>();
        params.put("amount",paymentInfo.getAmount());
        params.put("currency",paymentInfo.getCurrency());
        params.put("payment_method_types",paymentMethodTypes);
        params.put("description","Dev-Kart Purchase");

        params.put("receipt_email",paymentInfo.getReceiptEmail());

        return PaymentIntent.create(params);
    }

    private String generateTrackingNumber() {
//        generate a random UUID number (UUID version-4)
//        For details see:
        return UUID.randomUUID().toString();
    }
}
