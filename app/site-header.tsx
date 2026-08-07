import { getHeaderMenu } from "./lib/menus";
import SiteHeaderNav from "./site-header-nav";

/**
 * Site header. A server component so the nav is fetched from the CMS and
 * present in the initial HTML — the interactive parts live in
 * SiteHeaderNav, which this hands the resolved menu to.
 *
 * getHeaderMenu() never throws and falls back to the shipped nav, so an
 * unreachable or unconfigured CMS still renders a fully navigable site.
 */
export default async function SiteHeader() {
  const menu = await getHeaderMenu();
  return <SiteHeaderNav nav={menu.nav} cta={menu.cta} />;
}
