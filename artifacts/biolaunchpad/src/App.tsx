import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SiteLayout } from '@/components/layout/site-layout';
import NotFound from '@/pages/not-found';
import Home from '@/pages/home';
import AboutUs from '@/pages/about-us';
import ApplyNow from '@/pages/apply-now';
import Faqs from '@/pages/faqs';
import BlogIndex from '@/pages/blog-index';
import BlogPost from '@/pages/blog-post';
import Contact from '@/pages/contact';
import Service from '@/pages/service';
import ServiceInquiry from '@/pages/service-inquiry';
import HowItWorks from '@/pages/how-it-works';

const queryClient = new QueryClient();

const PAGES: [string, () => ReactNode][] = [
  ['/about-us', AboutUs],
  ['/apply-now', ApplyNow],
  ['/faqs', Faqs],
  ['/blog', BlogIndex],
  ['/contact', Contact],
  ['/service', Service],
  ['/service-inquiry', ServiceInquiry],
  ['/how-it-works', HowItWorks],
];

function Router() {
  return (
    <SiteLayout>
      <RoutedErrorBoundary>
        <Switch>
          <Route path="/" component={Home} />
          {PAGES.flatMap(([p, C]) => [<Route key={p} path={p} component={C} />, <Route key={`${p}/`} path={`${p}/`} component={C} />])}
          <Route path="/blog/:slug" component={BlogPost} />
          <Route path="/blog/:slug/" component={BlogPost} />
          <Route component={NotFound} />
        </Switch>
      </RoutedErrorBoundary>
    </SiteLayout>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
