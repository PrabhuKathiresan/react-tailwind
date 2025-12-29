import { Routes, Route, Navigate } from 'react-router'
import DocsLayout from './layouts/DocsLayout'
import HomePage from './pages/Home'
import InstallationPage from './pages/Installation'
import AlertDocsPage from './pages/components/Alert'
import BadgeDocsPage from './pages/components/Badge'
import ButtonDocsPage from './pages/components/Button'
import BannerDocsPage from './pages/components/Banner'
import BodyTextDocsPage from './pages/components/BodyText'
import BreadcrumbDocsPage from './pages/components/Breadcrumb'
import CardDocsPage from './pages/components/Card'
import CheckboxDocsPage from './pages/components/Checkbox'
import CheckboxGroupDocsPage from './pages/components/CheckboxGroup'
import DetailedInformationDocsPage from './pages/components/DetailedInformation'
import DrawerDocsPage from './pages/components/Drawer'
import DropdownDocsPage from './pages/components/Dropdown'
import HeadingTextDocsPage from './pages/components/HeadingText'
import InputDocsPage from './pages/components/Input'
import PaginationDocsPage from './pages/components/Pagination'
import PasswordInputDocsPage from './pages/components/PasswordInput'
import BasePageLayout from './layouts/BasePageLayout'
import SelectBoxDocsPage from './pages/components/SelectBox'
import TextareaDocsPage from './pages/components/Textarea'
import RadioDocsPage from './pages/components/Radio'
import RadioGroupDocsPage from './pages/components/RadioGroup'
import RadioSwitchDocsPage from './pages/components/RadioSwitch'
import RangeInputDocsPage from './pages/components/RangeInput'
import RangeSliderDocsPage from './pages/components/RangeSlider'
import TabsDocsPage from './pages/components/Tabs'
import ToastDocsPage from './pages/components/Toast'
import TextContentDocsPage from './pages/components/TextContent'
import TableDocsPage from './pages/components/Table'
import DataTableDocsPage from './pages/components/DataTable'
import VirtualizedDataTableDocsPage from './pages/components/VirtualizedDataTable'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<BasePageLayout />}>
        <Route index element={<HomePage />} />
        <Route element={<DocsLayout />}>
          <Route path="installation" element={<InstallationPage />} />
          <Route path="alert" element={<AlertDocsPage />} />
          <Route path="badge" element={<BadgeDocsPage />} />
          <Route path="banner" element={<BannerDocsPage />} />
          <Route path="body-text" element={<BodyTextDocsPage />} />
          <Route path="breadcrumb" element={<BreadcrumbDocsPage />} />
          <Route path="button" element={<ButtonDocsPage />} />
          <Route path="card" element={<CardDocsPage />} />
          <Route path="checkbox" element={<CheckboxDocsPage />} />
          <Route path="checkbox-group" element={<CheckboxGroupDocsPage />} />
          <Route path="data-table" element={<DataTableDocsPage />} />
          <Route path="detailed-information" element={<DetailedInformationDocsPage />} />
          <Route path="drawer" element={<DrawerDocsPage />} />
          <Route path="dropdown" element={<DropdownDocsPage />} />
          <Route path="heading-text" element={<HeadingTextDocsPage />} />
          <Route path="input" element={<InputDocsPage />} />
          <Route path="pagination" element={<PaginationDocsPage />} />
          <Route path="password-input" element={<PasswordInputDocsPage />} />
          <Route path="radio" element={<RadioDocsPage />} />
          <Route path="radio-group" element={<RadioGroupDocsPage />} />
          <Route path="radio-switch" element={<RadioSwitchDocsPage />} />
          <Route path="range-input" element={<RangeInputDocsPage />} />
          <Route path="range-slider" element={<RangeSliderDocsPage />} />
          <Route path="select-box" element={<SelectBoxDocsPage />} />
          <Route path="table" element={<TableDocsPage />} />
          <Route path="tabs" element={<TabsDocsPage />} />
          <Route path="textarea" element={<TextareaDocsPage />} />
          <Route path="text-content" element={<TextContentDocsPage />} />
          <Route path="toast" element={<ToastDocsPage />} />
          <Route path="virtualized-data-table" element={<VirtualizedDataTableDocsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  )
}
