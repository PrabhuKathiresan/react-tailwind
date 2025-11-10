import { BrowserRouter, Routes, Route, NavLink } from 'react-router'
import { routes } from './routes'
import Home from './pages/Home'
import AlertDocsPage from './pages/components/Alert'
import BadgeDocsPage from './pages/components/Badge'
import ButtonDocsPage from './pages/components/Button'
import BannerDocsPage from './pages/components/Banner'
import BodyTextDocsPage from './pages/components/BodyText'
import BreadcrumbDocsPage from './pages/components/Breadcrumb'
import CheckboxDocsPage from './pages/components/Checkbox'
import CheckboxGroupDocsPage from './pages/components/CheckboxGroup'
import DetailedInformationDocsPage from './pages/components/DetailedInformation'
import DrawerDocsPage from './pages/components/Drawer'
import DropdownDocsPage from './pages/components/Dropdown'
import HeadingTextDocsPage from './pages/components/HeadingText'
import InputDocsPage from './pages/components/Input'
import PaginationDocsPage from './pages/components/Pagination'
import PasswordInputDocsPage from './pages/components/PasswordInput'

// ... import other pages

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <aside className="w-64 bg-gray-50 border-r border-gray-200 p-4">
          <h1 className="text-lg font-semibold mb-4">React Tailwind UI</h1>
          <nav className="space-y-1">
            {routes.map((r) => (
              <NavLink
                key={r.path}
                to={r.path}
                className={({ isActive }) =>
                  `block rounded-md px-2 py-1 text-sm ${
                    isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
                  }`
                }
              >
                {r.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="flex-1 overflow-y-auto p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/alert" element={<AlertDocsPage />} />
            <Route path="/badge" element={<BadgeDocsPage />} />
            <Route path="/banner" element={<BannerDocsPage />} />
            <Route path="/body-text" element={<BodyTextDocsPage />} />
            <Route path="/breadcrumb" element={<BreadcrumbDocsPage />} />
            <Route path="/button" element={<ButtonDocsPage />} />
            <Route path="/checkbox" element={<CheckboxDocsPage />} />
            <Route path="/checkbox-group" element={<CheckboxGroupDocsPage />} />
            <Route path="/detailed-information" element={<DetailedInformationDocsPage />} />
            <Route path="/drawer" element={<DrawerDocsPage />} />
            <Route path="/dropdown" element={<DropdownDocsPage />} />
            <Route path="/heading-text" element={<HeadingTextDocsPage />} />
            <Route path="/input" element={<InputDocsPage />} />
            <Route path="/pagination" element={<PaginationDocsPage />} />
            <Route path="/password-input" element={<PasswordInputDocsPage />} />
            {/* <Route path="/dialog" element={<DialogPage />} /> */}
            {/* Add other component docs here */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
