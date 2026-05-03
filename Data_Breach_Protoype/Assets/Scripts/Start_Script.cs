using System.Collections;
using UnityEngine;
using UnityEngine.SceneManagement;

public class Start_Script : MonoBehaviour
{
    [SerializeField] private string gamescene = "";
    [SerializeField] private string helpscene = "";
    [SerializeField] private string startmenuscene = "";
    [SerializeField] private AudioSource audiosource;
    [SerializeField] private AudioClip clicksfx;
    //[SerializeField] private GameObject audioholder;

    //public void Update()
    //{ if (SceneManager.GetActiveScene().name == "HelpScene")
    //    {
    //        DontDestroyOnLoad(this.gameObject);
    //    }

    //}

    public void PlayButton()
    {
        StartCoroutine(PlaySound(gamescene));
    }

    public void HelpButton()
    {
        StartCoroutine(PlaySound(helpscene));
    }

    public void Back_to_start_menu()
    {
        StartCoroutine(PlaySound(startmenuscene));
    }

    public void QuitButton()
    {
        StartCoroutine(QuitSound());
    }

    IEnumerator PlaySound(string scene)
    {
        audiosource.PlayOneShot(clicksfx);
        yield return new WaitForSeconds(clicksfx.length);
        SceneManager.LoadScene(scene);
    }

    IEnumerator QuitSound()
    {
        audiosource.PlayOneShot(clicksfx);
        yield return new WaitForSeconds(clicksfx.length);
        Application.Quit();
    }
}
