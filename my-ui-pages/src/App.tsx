import { Routes, Route, Navigate } from 'react-router'
import DocsLayout from './layouts/DocsLayout'
import HomePage from './pages/Home'
import InstallationPage from './pages/Installation'
import AccordionDocsPage from './pages/components/Accordion'
import ActionSheetDocsPage from './pages/components/ActionSheet'
import AlertDocsPage from './pages/components/Alert'
import BadgeDocsPage from './pages/components/Badge'
import ButtonDocsPage from './pages/components/Button'
import ButtonGroupDocsPage from './pages/components/ButtonGroup'
import BannerDocsPage from './pages/components/Banner'
import BodyTextDocsPage from './pages/components/BodyText'
import BottomNavigationDocsPage from './pages/components/BottomNavigation'
import BreadcrumbDocsPage from './pages/components/Breadcrumb'
import CardDocsPage from './pages/components/Card'
import CheckboxDocsPage from './pages/components/Checkbox'
import CheckboxGroupDocsPage from './pages/components/CheckboxGroup'
import DetailedInformationDocsPage from './pages/components/DetailedInformation'
import DrawerDocsPage from './pages/components/Drawer'
import FlexDocsPage from './pages/components/Flex'
import GridDocsPage from './pages/components/Grid'
import FloatingActionButtonDocsPage from './pages/components/FloatingActionButton'
import DropdownDocsPage from './pages/components/Dropdown'
import HeadingTextDocsPage from './pages/components/HeadingText'
import InputDocsPage from './pages/components/Input'
import PaginationDocsPage from './pages/components/Pagination'
import PasswordInputDocsPage from './pages/components/PasswordInput'
import PinInputDocsPage from './pages/components/PinInput'
import PullToRefreshDocsPage from './pages/components/PullToRefresh'
import BasePageLayout from './layouts/BasePageLayout'
import MobilePickerDocsPage from './pages/components/MobilePicker'
import WheelPickerDocsPage from './pages/components/WheelPicker'
import MobileHeaderDocsPage from './pages/components/MobileHeader'
import MobileStepperDocsPage from './pages/components/MobileStepper'
import DataListDocsPage from './pages/components/DataList'
import SwipeableRowDocsPage from './pages/components/SwipeableRow'
import SwipeableTabsDocsPage from './pages/components/SwipeableTabs'
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
import SegmentedControlDocsPage from './pages/components/SegmentedControl'
import QuantityStepperDocsPage from './pages/components/QuantityStepper'
import StatusPillDocsPage from './pages/components/StatusPill'
import StickyActionBarDocsPage from './pages/components/StickyActionBar'
import SkeletonDocsPage from './pages/components/Skeleton'
import UtilitiesDocsPage from './pages/UtilitiesDocs'
import HooksDocsPage from './pages/HooksDocs'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<BasePageLayout />}>
        <Route index element={<HomePage />} />
        <Route element={<DocsLayout />}>
          <Route path="installation" element={<InstallationPage />} />
          <Route path="utilities" element={<UtilitiesDocsPage />} />
          <Route path="hooks" element={<HooksDocsPage />} />
          <Route path="accordion" element={<AccordionDocsPage />} />
          <Route path="action-sheet" element={<ActionSheetDocsPage />} />
          <Route path="alert" element={<AlertDocsPage />} />
          <Route path="badge" element={<BadgeDocsPage />} />
          <Route path="banner" element={<BannerDocsPage />} />
          <Route path="body-text" element={<BodyTextDocsPage />} />
          <Route path="bottom-navigation" element={<BottomNavigationDocsPage />} />
          <Route path="breadcrumb" element={<BreadcrumbDocsPage />} />
          <Route path="button" element={<ButtonDocsPage />} />
          <Route path="button-group" element={<ButtonGroupDocsPage />} />
          <Route path="card" element={<CardDocsPage />} />
          <Route path="checkbox" element={<CheckboxDocsPage />} />
          <Route path="checkbox-group" element={<CheckboxGroupDocsPage />} />
          <Route path="data-table" element={<DataTableDocsPage />} />
          <Route path="detailed-information" element={<DetailedInformationDocsPage />} />
          <Route path="drawer" element={<DrawerDocsPage />} />
          <Route path="flex" element={<FlexDocsPage />} />
          <Route path="grid" element={<GridDocsPage />} />
          <Route path="floating-action-button" element={<FloatingActionButtonDocsPage />} />
          <Route path="dropdown" element={<DropdownDocsPage />} />
          <Route path="heading-text" element={<HeadingTextDocsPage />} />
          <Route path="input" element={<InputDocsPage />} />
          <Route path="pagination" element={<PaginationDocsPage />} />
          <Route path="password-input" element={<PasswordInputDocsPage />} />
          <Route path="pin-input" element={<PinInputDocsPage />} />
          <Route path="pull-to-refresh" element={<PullToRefreshDocsPage />} />
          <Route path="quantity-stepper" element={<QuantityStepperDocsPage />} />
          <Route path="radio" element={<RadioDocsPage />} />
          <Route path="radio-group" element={<RadioGroupDocsPage />} />
          <Route path="radio-switch" element={<RadioSwitchDocsPage />} />
          <Route path="range-input" element={<RangeInputDocsPage />} />
          <Route path="range-slider" element={<RangeSliderDocsPage />} />
          <Route path="segmented-control" element={<SegmentedControlDocsPage />} />
          <Route path="select-box" element={<SelectBoxDocsPage />} />
          <Route path="mobile-picker" element={<MobilePickerDocsPage />} />
          <Route path="wheel-picker" element={<WheelPickerDocsPage />} />
          <Route path="mobile-header" element={<MobileHeaderDocsPage />} />
          <Route path="mobile-stepper" element={<MobileStepperDocsPage />} />
          <Route path="data-list" element={<DataListDocsPage />} />
          <Route path="swipeable-row" element={<SwipeableRowDocsPage />} />
          <Route path="swipeable-tabs" element={<SwipeableTabsDocsPage />} />
          <Route path="skeleton" element={<SkeletonDocsPage />} />
          <Route path="status-pill" element={<StatusPillDocsPage />} />
          <Route path="sticky-action-bar" element={<StickyActionBarDocsPage />} />
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
