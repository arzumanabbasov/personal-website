import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>

      <h1 className="text-3xl font-bold mb-4">Arzuman Abbasov</h1>

      <br/>

      <p> I am a Data Scientist with hands-on experience in banking and large-scale data analysis. My work focuses on building practical machine learning systems and ensuring data quality in production environments. I specialize in turning complex data challenges into reliable, scalable solutions. </p>
      <br/>
      <p>Currently pursuing an MSc in Data Science at Óbuda University while working on real-world data science projects.</p>

      


      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
