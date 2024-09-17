import React from 'react'
import { useSelector } from 'react-redux'
import { useGetOrderByIdQuery } from '../../../../redux/features/orders/ordersApi'
import TimelineStep from '../../../../components/Payment/TimelineStep'
import { useParams } from 'react-router-dom'

const OrderDetails = () => {

    const {orderId} = useParams()
    const {data: orderData, error , isLoading } = useGetOrderByIdQuery(orderId)
    if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>No orders found!</div>;
      }

      const order = orderData.order || {}

    const isCompleted = (status) => {
        const statuses = ['pending', 'processing', 'shipped', 'completed'];
        const result = statuses.indexOf(status) < statuses.indexOf(order?.status);
        return result;
      };
      
    
      const isCurrent = (status) => order.status === status;
      const steps = [
        {
          status: 'pending',
          label: 'Pending',
          description: 'Your order has been created and is awaiting processing',
          icon: {
            iconName: 'time-line',
            bgColor: 'red-500',
            textColor: 'gray-800',
          },
        },
        {
          status: 'processing',
          label: 'Processing',
          description: 'Your order is currently being processed',
          icon: {
            iconName: 'loader-line',
            bgColor: 'yellow-800',
            textColor: 'yellow-800',
          },
        },
        {
          status: 'shipped',
          label: 'Shipped',
          description: 'Your order has been shipped',
          icon: {
            iconName: 'truck-line',
            bgColor: 'blue-800',
            textColor: 'blue-800',
          },
        },
        {
          status: 'completed',
          label: 'Completed',
          description: 'Your order has been successfully completed',
          icon: {
            iconName: 'check-line',
            bgColor: 'red-500',
            textColor: 'green-900',
          },
        },
      ];
    
  return (
    <section className='section__container rounded p-6'>
    <h2 className='text-2xl font-semibold mb-4'>Payment {order?.status}</h2>
    <p className='mb-4'>Order Id: {order?.orderId}</p>
    <p className='mb-8'>Status: {order?.status}</p>

    <ol className='sm:flex relative items-center '>
      {steps.map((step, index) => (
        <TimelineStep
          step={step}
          key={index}
          isCompleted={isCompleted(step.status)}
          isCurrent={isCurrent(step.status)}
          isLastStep={index === steps.length - 1}
          icon={step.icon}
          order={order}
          description={step.description}
        />
      ))}
    </ol>
  </section>
  )
}

export default OrderDetails