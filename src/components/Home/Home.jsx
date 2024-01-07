import Header from './Header/Header'
import FeatureCart from './FeatureCart/FeatureCart'
import Service from './Services/Service'
import ContentOne from './ContentOne/ContentOne'
import ContentTwo from './ContectTwo/ContentTwo'
import Testimonials from './Testimonials/Testimonials'

export default function Home() {
  return (
    <div>
      <Header></Header>
      <FeatureCart></FeatureCart>
      <Service></Service>
      <ContentOne></ContentOne>
      <ContentTwo></ContentTwo>
      <Testimonials></Testimonials>
    </div>
  )
}
