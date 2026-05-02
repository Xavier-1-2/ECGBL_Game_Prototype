using UnityEngine;
using UnityEngine.SceneManagement;

public class Door_Trigger : MonoBehaviour
{
    [SerializeField] private string SceneLoad;
    [SerializeField] private GameObject Defaulttext;
    [SerializeField] private GameObject Displaytext;
    private bool playerInRange;

    void Start()
    {
    }

    void Update()
    {
        if (playerInRange && Input.GetKeyDown(KeyCode.E))
        {
            SceneManager.LoadScene(SceneLoad);
        }

    }

    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            playerInRange = true;
            if (Defaulttext != null)
                Defaulttext.SetActive(false);

            if (Displaytext != null)
                Displaytext.SetActive(true);
        }
    }

    private void OnTriggerExit2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            playerInRange = false;

            if (Defaulttext != null)
                Defaulttext.SetActive(true);

            if (Displaytext != null)
                Displaytext.SetActive(false);
        }
    }
}