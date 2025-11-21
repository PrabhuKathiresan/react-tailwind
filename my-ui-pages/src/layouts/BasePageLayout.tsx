import { Outlet } from 'react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function BasePageLayout() {
  return (
    <>
      <Header />
      <div className="min-h-dvh pt-[61px]">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
