using System.Collections;
using UnityEngine;
using TMPro;
using UnityEngine.SceneManagement;
public class Text_Gen : MonoBehaviour
{
    public TextMeshProUGUI textComponent;

    [TextArea(2, 5)]
    public string[] lines;

    public float typingSpeed = 0.05f;

    public AudioSource audioSource;
    public AudioClip typingSound;

    private int index = 0;
    private bool isTyping = false;
    private bool isFinished = false;

    void Start()
    {
        StartCoroutine(TypeLine());
    }

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            if (isTyping)
            {
                StopAllCoroutines();
                textComponent.text = lines[index];
                isTyping = false;
            }
            else if (!isFinished)
            {
                NextLine();
            }
            else
            {
                LoadNextScene();
            }
        }
    }

    IEnumerator TypeLine()
    {
        isTyping = true;
        textComponent.text = "";

        int letterCount = 0;

        foreach (char letter in lines[index])
        {
            textComponent.text += letter;

            if (letter != ' ')
            {
                letterCount++;

                if (letterCount % 2 == 0)
                {
                    audioSource.PlayOneShot(typingSound);
                }
            }

            yield return new WaitForSeconds(typingSpeed);
        }

        isTyping = false;
    }

    void NextLine()
    {
        if (index < lines.Length - 1)
        {
            index++;
            StartCoroutine(TypeLine());
        }
        else
        {
            isFinished = true;
            
        }
    }
    void LoadNextScene()
    {
        SceneManager.LoadScene("Level_1");
    }
}