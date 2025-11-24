import { Outlet } from 'react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Drawer } from '@pk-design/react-tailwind'
import { useAppContext } from '../contexts/AppContext'
import ReactTailwindIcon from '../icons/ReactTailwindIcon'
import { LogoText } from '../components/LogoText'
import NavList from '../components/NavList'

export default function BasePageLayout() {
  const { expanded, setExpanded } = useAppContext()
  return (
    <>
      <Header />
      <Drawer
        align="start"
        size="xs"
        isOpen={expanded}
        onClose={() => setExpanded(false)}
        titleClass="pt-3"
        showBackButton
        title={
          <div className="flex items-center gap-1">
            <ReactTailwindIcon />
            <LogoText />
          </div>
        }
      >
        <div className="px-4 py-2">
          <NavList />
        </div>
      </Drawer>
      <div className="min-h-dvh pt-[61px]">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
