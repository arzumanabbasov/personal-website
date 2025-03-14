import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { Calendar, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Blog | " + DATA.name,
  description: "My thoughts on software development, life, and more.",
  metadataBase: new URL(DATA.url),
  alternates: {
    canonical: `${DATA.url}/blog`,
  },
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await getBlogPosts();
  
  // Sort posts by date (newest first)
  const sortedPosts = posts.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  });
  
  // Separate featured post and remaining posts
  const featuredPost = sortedPosts[0];
  const remainingPosts = sortedPosts.slice(1);

  return (
    <div 
      className="relative min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23595959' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '30px 30px',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <h1 className="font-bold text-3xl md:text-4xl mb-8 tracking-tighter">
            My Blog
          </h1>
        </BlurFade>
        
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          {/* Featured Post - Larger and with different background */}
          {featuredPost && (
            <BlurFade delay={BLUR_FADE_DELAY * 2} className="md:col-span-2 md:row-span-2">
              <Link
                className="block h-full"
                href={`/blog/${featuredPost.slug}`}
              >
                <article className="bg-primary/5 border border-primary/20 rounded-xl p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:bg-primary/10 h-full flex flex-col">
                  <div className="flex items-center text-muted-foreground text-sm mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <time dateTime={featuredPost.metadata.publishedAt}>
                      {new Date(featuredPost.metadata.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4 text-foreground">
                    {featuredPost.metadata.title}
                  </h2>
                  
                  {featuredPost.metadata.summary && (
                    <p className="text-muted-foreground mb-4 text-lg flex-grow">
                      {featuredPost.metadata.summary}
                    </p>
                  )}
                  
                  <div className="flex items-center text-sm font-medium text-primary mt-4 group hover:translate-x-1 transition-transform">
                    Read featured post <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </article>
              </Link>
            </BlurFade>
          )}

          {/* Remaining Posts - Smaller and arranged around the featured post */}
          {remainingPosts.map((post, id) => (
            <BlurFade delay={BLUR_FADE_DELAY * 3 + id * 0.05} key={post.slug}>
              <Link
                className="block h-full"
                href={`/blog/${post.slug}`}
              >
                <article className="bg-card hover:bg-card/80 border border-border rounded-lg p-4 md:p-5 transition-all duration-300 hover:shadow-md h-full flex flex-col">
                  <div className="flex items-center text-muted-foreground text-xs mb-2">
                    <Calendar className="h-3 w-3 mr-1" />
                    <time dateTime={post.metadata.publishedAt}>
                      {new Date(post.metadata.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  
                  <h2 className="text-lg font-medium tracking-tight mb-2 text-foreground flex-grow">
                    {post.metadata.title}
                  </h2>
                  
                  <div className="flex items-center text-xs font-medium text-primary mt-2 group hover:translate-x-1 transition-transform">
                    Read post <ArrowRight className="ml-1 h-3 w-3" />
                  </div>
                </article>
              </Link>
            </BlurFade>
          ))}
        </div>
        
        {posts.length === 0 && (
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <div className="text-center py-12">
              <p className="text-muted-foreground">No posts yet. Check back soon!</p>
            </div>
          </BlurFade>
        )}
      </div>
    </div>
  );
}